import { Routes } from '@angular/router';
import { App } from './app';
import { EditNote } from './edit-note/edit-note';
import { Home } from './home/home';

export const routes: Routes = [
    {path: '', component: Home, title: 'Keep Notes'},
    {path: 'note/:id', component: EditNote, title: 'Edit Note'}, 
    {path: '**', redirectTo: ''},
    // wildcards
];
