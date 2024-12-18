import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from '../../shared/state/user.store';

@Component({
    selector: 'boc-login',
    imports: [CommonModule, MatButtonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    public readonly userStore = inject(UserStore);
}
