import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationMockComponent } from './authentication-mock.component';

describe('AuthenticationMockComponent', () => {
  let component: AuthenticationMockComponent;
  let fixture: ComponentFixture<AuthenticationMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
