import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientModelComponent } from './client-model.component';

describe('ClientModelComponent', () => {
  let component: ClientModelComponent;
  let fixture: ComponentFixture<ClientModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
