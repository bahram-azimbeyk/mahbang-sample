import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  form: FormGroup;
  dialogState: 'create' | 'edit';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { state: 'create' | 'edit', employee?: Employee }
  ) {
    this.dialogState = data.state;
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(18), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    if (this.dialogState === 'edit' && this.data.employee) {
      this.form.patchValue({
        name: this.data.employee.name,
        salary: this.data.employee.salary,
        age: this.data.employee.age
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
