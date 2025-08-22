import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit():void {
    this.fetchNotes();
  }
  
  fetchNotes() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.pinned = JSON.parse(localStorage.getItem('pinnedNotes') || '[]');

    this.resetColumns();
  }

  resetColumns() {

    this.columns = [[], [], [], [], []];
    this.notes.slice().reverse().forEach((note, index) => {
      this.columns[index % 5].push(note); 
    });
  }
  new_note = "";
  title = "";
  note = ""; 
  columns:any = [[], [], [], [], []];


  constructor() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  handleClickOutside(event:any) {    
    const box = document.querySelector('.start-typing') as HTMLElement;
    const editBox = document.querySelector('.edit-inner-card') as HTMLElement;
    if (box && !box.contains(event.target)) {
      this.saveNote();
      this.new_note = ""
      console.log('Clicked outside start_typing box');
    }else if(editBox && !editBox.contains(event.target)){
      this.closeEdit(this.currentEditNode.id);
    }
  }

  autoExpand(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    const box = document.querySelector('.start-typing') as HTMLElement; 
    box.style.height = (textarea.scrollHeight + 100) + 'px';
  }

  notes:Array<any> = [];
  saveNote(){
    const noteId = this.notes.length !== 0 ? this.notes[this.notes.length -1].id : 0;
    const noteObj = {id: noteId + 1, title: this.title, note: this.note};
    
    this.notes.push(noteObj); 
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.title = '';
    this.note = '';
    const noteArea = document.getElementById('startTyping') as HTMLTextAreaElement;
    noteArea.style.display = 'none';
    this.resetColumns();

    
  }

  activeDropdownIndex: number | null = null;

  showDropdown(index: number) {
    this.activeDropdownIndex = index;
    console.log(this.activeDropdownIndex);
    
  }

  hideDropdown() {
    this.activeDropdownIndex = null;
  }

  currentlyEditing = false;
  currentEditNode:any = {};

  editNote(note:any) {
   this.currentlyEditing = true;
   this.currentEditNode = note;
  }
  closeEdit(noteId: number) {
    const editTitle = document.querySelector('.edit-title') as HTMLInputElement;
    const editText = document.querySelector('.edit-text') as HTMLInputElement;
    this.title = editTitle.innerHTML;
    this.note = editText.innerHTML;

    let noteIndex = this.notes.findIndex((note) => note.id === noteId);
    console.log(noteIndex);
    
    if(noteIndex !== -1) {
      this.notes[noteIndex].title = this.title;
      this.notes[noteIndex].note = this.note;
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.currentlyEditing = false;
      this.currentEditNode = {};
      this.resetColumns();
    }
  }


  deleteNote(noteId: number) {
    this.notes = this.notes.filter((note) => note.id !== noteId);    
    localStorage.setItem('notes', JSON.stringify(this.notes));

    this.pinned = this.pinned.filter((pinnedNote) => pinnedNote.id !== noteId);
    localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
    this.resetColumns();
  }

  pinned:Array<any> = [];
  pin(note:any) {
    this.currentlyEditing = false;
    this.pinned.push(note);
    this.notes = this.notes.filter((n) => n.id !== note.id);
    this.resetColumns();
    localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
    localStorage.setItem('notes', JSON.stringify(this.notes));
    
    
  }

  unpin(note:any) {
    this.pinned = this.pinned.filter((pinnedNote) => pinnedNote.id !== note.id);
    localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
    note = {...note, id: this.notes[this.notes.length -1].id + 1}; 
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.resetColumns();
  }



}

