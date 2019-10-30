import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {concat, fromEvent, Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';


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

  }


  ngAfterViewInit() {
    /**
     * https://rxjs-dev.firebaseapp.com/api/operators/switchMap
     * when a new inner observable arrives cancel the current running inner observable
     */
    const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map(event => event.target.value),
        distinctUntilChanged(),
        switchMap(searchTerm => this.loadLessons(searchTerm))
      );

    const initialLessons$ = this.loadLessons();
    this.lessons$ = concat(initialLessons$, searchLessons$);
  }

  private loadLessons(searchTerm = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${searchTerm}`)
      .pipe(
        map(response => response['payload'])
      );
  }

}
