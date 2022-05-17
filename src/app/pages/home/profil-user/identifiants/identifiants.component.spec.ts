import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiantsComponent } from './identifiants.component';

describe('IdentifiantsComponent', () => {
  let component: IdentifiantsComponent;
  let fixture: ComponentFixture<IdentifiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifiantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
