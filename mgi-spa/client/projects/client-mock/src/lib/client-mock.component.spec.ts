import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMockComponent } from './client-mock.component';

describe('ClientMockComponent', () => {
  let component: ClientMockComponent;
  let fixture: ComponentFixture<ClientMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
