import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
      this.subject();
      this.behaviorSubject();
      this.asyncSubject();
      this.replaySubject();

    }


  private subject() {
    // Subject is an observer and an observable
    // Do not share a subject as an API, or other parts of the application
    // Prefer do derive observables from source 'from', 'fromPromise'
    // Subjects are  mostly used for multi-casting
    const subject = new Subject();
    const series$ = subject.asObservable();

    series$.subscribe(val => console.log("Early subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    //subject.complete();

    // Late subscription does not receive any values already submitted
    setTimeout(() => {
      series$.subscribe(val => console.log("Late subscription: " + val));
    }, 3000)
  }

  private behaviorSubject() {
    // Allows 'late' subscriptions
    const initialValue = 0;
    const subject = new BehaviorSubject(initialValue);
    const series$ = subject.asObservable();

    series$.subscribe(val => console.log("Early subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    //subject.complete();  // if completed the late subscriber will not receive any values

    // Late subscription receives the last value emitted ('3')
    setTimeout(() => {
      series$.subscribe(val => console.log("Late subscription: " + val));
    }, 3000)
  }

  private asyncSubject() {
    // Await before completion before emitting the last value to all subscribers
    // Do not submit intermediate values
    const subject = new AsyncSubject();
    const series$ = subject.asObservable();

    series$.subscribe(val => console.log("First subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();

    // Late subscription receives the last value submitted before completion
    setTimeout(() => {
      series$.subscribe(val => console.log("Late subscription: " + val));
    }, 3000)

  }

  private replaySubject() {
    // Submit all intermediate values and store them for late subscribers
    const subject = new ReplaySubject();
    const series$ = subject.asObservable();

    series$.subscribe(val => console.log("Dirst subscription: " + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();

    // Late subscription receives all values submitted, even if the subject has not yet been completed
    setTimeout(() => {
      series$.subscribe(val => console.log("Late subscription: " + val));
    }, 3000)

  }

}






