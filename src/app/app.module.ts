import { GoogleLoginProvider, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { UiModule } from './ui/ui.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        AdminModule,
        UiModule,
        NgxSpinnerModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("accessToken"),
                allowedDomains: ["localhost:7188"]
            }
        }),
        SocialLoginModule
    ],
    providers: [
        { provide: "baseUrl", useValue: "https://localhost:7188/api", multi: true },
        {
            provide: SOCIAL_AUTH_CONFIG, useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider("171312266409-1rlh02ou5qcibkead9vuaqqfhcg1odds.apps.googleusercontent.com",{
                            oneTapEnabled: false
                        })
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        },
        provideAnimationsAsync(),
        provideToastr(),
        provideHttpClient(
            withInterceptors([authInterceptor])
        )
    ]
})
export class AppModule { }
