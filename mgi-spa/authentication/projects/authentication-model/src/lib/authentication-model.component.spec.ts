import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationModelComponent } from './authentication-model.component';

describe('AuthenticationModelComponent', () => {
  let component: AuthenticationModelComponent;
  let fixture: ComponentFixture<AuthenticationModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
