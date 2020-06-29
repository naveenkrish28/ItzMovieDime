import { TestBed, async, ComponentFixture } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { LoginComponent } from "./login.component"
import { FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { SocialLoginService } from "ng8-social-login";
import { Injector } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Overlay } from "@angular/cdk/overlay";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

describe('Login Component', ()=>{
    let fix: ComponentFixture<LoginComponent>;
    let comp: LoginComponent;
    let fb: FormBuilder;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            imports: 
                [RouterTestingModule,
                 ReactiveFormsModule,
                 MatFormFieldModule,
                 MatSnackBarModule,
                 HttpClientTestingModule,
                MatInputModule,
            BrowserAnimationsModule],
            declarations: [LoginComponent],
            providers: []
        }).compileComponents();

        fix = TestBed.createComponent(LoginComponent);
        comp = fix.debugElement.componentInstance;
        //fb = TestBed.get(FormBuilder);
    }))

    it('should create a form builder empty email and pass', ()=>{
        comp.ngOnInit();
        expect(comp.fg).toBeTruthy();
        expect(comp.fg.get('email').value).toEqual("");
        expect(comp.fg.get('password').value).toEqual("");
    });

    it('should validate forms', ()=>{
        comp.ngOnInit();
        expect(comp.fg.get("email").errors).toBeDefined();
        comp.fg.get("email").setValue("navkris@gm.cm");
        expect(comp.fg.get("email").errors).toBeNull();
        // comp.onReset(comp.fg);
        // expect(comp.fg.dirty).toBeFalsy();
    })
});