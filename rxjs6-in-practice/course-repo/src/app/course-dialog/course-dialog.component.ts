import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {concatMap, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', {static: true}) saveButton: ElementRef;

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  ngOnInit() {
    // Auto save functionality
    // this.withoutObservables();
    // this.withConcatMap();
    this.withMergeMap();
  }


  private withoutObservables() {
    /*
      Submits a request on any change, does not wait for the previous save to finish
     */
    this.form.valueChanges.pipe(
      filter(() => this.form.valid)
    )
      .subscribe(changes => {
        const saveCourse$ = this.saveCourse(changes);
        saveCourse$.subscribe();
      });
  }

  private saveCourse(changes) {
    // 'fromPromise' creates an observable from a promise.
    return fromPromise(fetch(`/api/courses/${this.course.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  private withConcatMap() {
    /*
      https://rxjs-dev.firebaseapp.com/api/operators/concatMap
      Saves are executed only after the previous save has been completed, which may introduce delay but avoids overrides
     */
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        concatMap(changes => this.saveCourse(changes))
      )
      .subscribe();
  }

  private withMergeMap() {
    /*
      https://rxjs-dev.firebaseapp.com/api/operators/mergeMap
      Multiple save calls in parallel, use only if the order is not important.
     */
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        mergeMap(changes => this.saveCourse(changes))
      )
      .subscribe();
  }


  ngAfterViewInit() {
    /*
      https://rxjs-dev.firebaseapp.com/api/operators/exhaustMap
      https://rxjs-dev.firebaseapp.com/api/operators/exhaust
      drop the next inner observable while the current inner observable is still executing
     */
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(
        exhaustMap(() => this.saveCourse(this.form.value))
      )
      .subscribe();

  }


  close() {
    this.dialogRef.close();
  }

}
