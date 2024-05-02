import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDailogFormComponent } from './user-dailog-form/user-dailog-form.component';
import { SprintFormComponent } from './sprints/sprint-form/sprint-form.component';

export const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'userForm/:data', component: UserDailogFormComponent },
    { path: 'sprint', component: SprintFormComponent },
];
