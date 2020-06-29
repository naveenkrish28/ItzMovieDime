import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoginService } from './services/login.service';

describe('AppComponent', () => {
  let login: LoginService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [LoginService]
    }).compileComponents();
    login = TestBed.get(LoginService);
  }));

  afterEach(()=>{
    localStorage.clear();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ItzMovieDime'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ItzMovieDime');
  });

  it('should check localStorage',()=>{
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    localStorage.setItem("email","blahblah");
    localStorage.setItem("Admin","true");
    app.ngOnInit();
    expect(login.isLoggedIn).toBeTruthy();
    expect(login.isAdmin).toBeTruthy(); 
  })
});
