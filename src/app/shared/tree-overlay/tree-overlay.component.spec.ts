import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeOverlayComponent } from './tree-overlay.component';

describe('TreeOverlayComponent', () => {
  let component: TreeOverlayComponent;
  let fixture: ComponentFixture<TreeOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
