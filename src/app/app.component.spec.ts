import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

// Mock the child component
@Component({
  selector: 'app-employee-list',
  template: ''
})
class MockEmployeeListComponent { }

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockEmployeeListComponent  // Declare the mock component
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-employee-list component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-employee-list')).not.toBeNull();
  });
});
