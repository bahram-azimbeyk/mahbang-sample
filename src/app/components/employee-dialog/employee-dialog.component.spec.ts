import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EmployeeDialogComponent', () => {
  let component: EmployeeDialogComponent;
  let fixture: ComponentFixture<EmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('salary')).toBeDefined();
    expect(component.form.get('age')).toBeDefined();
  });

  it('should validate the form', () => {
    const nameControl = component.form.get('name');
    const salaryControl = component.form.get('salary');
    const ageControl = component.form.get('age');

    // Initially, all fields are invalid
    expect(nameControl?.valid).toBeFalsy();
    expect(salaryControl?.valid).toBeFalsy();
    expect(ageControl?.valid).toBeFalsy();

    // Set values
    nameControl?.setValue('John Doe');
    salaryControl?.setValue('50000');
    ageControl?.setValue('30');

    // Now, all fields should be valid
    expect(nameControl?.valid).toBeTruthy();
    expect(salaryControl?.valid).toBeTruthy();
    expect(ageControl?.valid).toBeTruthy();
  });

});
