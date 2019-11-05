import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {forkJoin, fromEvent, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {debug, RxJsLoggingLevel, setRxJsLoggingLevel} from '../common/debug';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;


  @ViewChild('searchInput', {static: true}) input: ElementRef;

  constructor(private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`) as Observable<Course>;

    const lessons$ = this.loadLessons();

    forkJoin(this.course$, lessons$)
      .pipe(
        tap(([course, lessons]) => {
          console.log('course ', course);
          console.log('lessons ', lessons);
        })
      )
      .subscribe();
  }


  ngAfterViewInit() {
    setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG);

    /**
     * https://rxjs-dev.firebaseapp.com/api/operators/switchMap
     * when a new inner observable arrives cancel the current running inner observable
     */
    const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        tap(search => console.log('search: ', search)),
        debug(RxJsLoggingLevel.TRACE, 'search '),
        debounceTime(200),
        distinctUntilChanged(),
        debug(RxJsLoggingLevel.DEBUG, 'search '),
        switchMap(searchTerm => this.loadLessons(searchTerm))
      );

    // Merge initial lessons with 'key event' lessons
    // replaced with the 'startWith opperator' above
    // const initialLessons$ = this.loadLessons();
    // this.lessons$ = concat(initialLessons$, searchLessons$);

    this.lessons$ = searchLessons$;
  }

  private loadLessons(searchTerm = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${searchTerm}`)
      .pipe(
        map(response => response['payload'])
      );
  }

}
