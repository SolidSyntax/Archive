import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, merge, noop, Observable, of, timer} from 'rxjs';
import {error} from '@angular/compiler/src/util';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

  intervals() {
    const interval$ = interval(1000);
    interval$.subscribe(value => console.log('Interval 1 => ' + value));

    const interval2Subscription = interval$.subscribe(value => console.log('Interval 2 => ' + value));
    setTimeout(() => interval2Subscription.unsubscribe(), 5000);

    const timer$ = timer(3000, 1000);
    timer$.subscribe(value => console.log('Timer 1 => ' + value));


    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      event => console.log('Click => ' + event),
      err => console.log(err),
      () => console.log('completed')  // Error and completion are exclusive
    );
  }

  customHttp() {
    const http$ = new Observable(observer => {
      fetch('/api/courses')
        .then(response => {
          return response.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });

    http$.subscribe(
      response => console.log(response),
      noop, // No opperation () => {}
      () => console.log('completed')
    );

  }

  mapOperator() {
    createHttpObservable('/api/courses')
      .pipe(
        map(res => Object.values(res['payload']))
      ).subscribe(
      response => console.log(response),
      noop, // No opperation () => {}
      () => console.log('completed')
    );
  }

  concatenation() {
    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);

    const result$ = concat(source1$, source2$, source3$);
    result$.subscribe(console.log);

    const interval$ = interval(1000);

    // source2$ & source3$ are never activated because interval$ never completes
    const neverCompletes$ = concat(source1$, interval$, source2$, source3$);
    neverCompletes$.subscribe(console.log);
  }

  mergeOperator() {
    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map(val => val * 10));

    const result$ = merge(interval1$, interval2$);

    result$.subscribe(console.log);
  }

}
