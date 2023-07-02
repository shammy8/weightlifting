import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOfSetComponent } from './group-of-set.component';

describe('GroupOfSetComponent', () => {
  let component: GroupOfSetComponent;
  let fixture: ComponentFixture<GroupOfSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupOfSetComponent]
    });
    fixture = TestBed.createComponent(GroupOfSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
