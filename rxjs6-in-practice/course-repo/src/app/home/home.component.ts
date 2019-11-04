import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, timer} from 'rxjs';
import {delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private static ERROR_COURSE: Course = {
    id: 0,
    description: 'Something went wrong',
    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
    courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
    longDescription: 'No courses could be loaded from the server.',
    category: 'BEGINNER',
    lessonsCount: 10
  };

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;


  constructor() {

  }

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$.pipe(
      // alternative value error handling strategy
      /**
       catchError(err => of([HomeComponent.ERROR_COURSE]))
       **/

      // catch and rethrow strategy
      /**
       catchError(err => {
         console.log('Error occured', err);
         return throwError(err);
       }),
       */

      // retry error handling strategy
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(2000))
      )),

      // cleanup logic
      finalize(() => {
        console.log('Finalize executed...');
      }),
      tap(() => console.log('HTTP request executed.')),
      map(res => Object.values(res['payload']) as Course[]),

      // replay the result for each subscription
      // all previous steps are only executed once
      shareReplay()
    );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === 'BEGINNER')
        ));

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === 'ADVANCED')
        ));


  }

}
