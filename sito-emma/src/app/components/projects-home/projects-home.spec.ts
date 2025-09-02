import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHome } from './projects-home';

describe('ProjectsHome', () => {
  let component: ProjectsHome;
  let fixture: ComponentFixture<ProjectsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
