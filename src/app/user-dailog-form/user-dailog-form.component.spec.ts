import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDailogFormComponent } from './user-dailog-form.component';

describe('UserDailogFormComponent', () => {
  let component: UserDailogFormComponent;
  let fixture: ComponentFixture<UserDailogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDailogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDailogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
