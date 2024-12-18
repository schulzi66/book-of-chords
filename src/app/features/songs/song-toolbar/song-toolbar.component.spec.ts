import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongToolbarComponent } from './song-toolbar.component';

describe('SongToolbarComponent', () => {
  let component: SongToolbarComponent;
  let fixture: ComponentFixture<SongToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
