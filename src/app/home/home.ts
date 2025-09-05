import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
    ngOnInit():void {
    this.fetchNotes();
    document.getElementById('noteArea')?.focus();

  }
  reversedPinned:Array<any> = [];
  
  fetchNotes() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.pinned = JSON.parse(localStorage.getItem('pinnedNotes') || '[]');

    this.resetColumns();
    this.reversedPinned = this.pinned.slice().reverse();

  }

  resetColumns() {
    this.columns = [[], [], [], [], []];
    this.notes.slice().reverse().forEach((note, index) => {
      this.columns[index % 5].push(note); 
    });
    // this.reversedPinned = this.pinned.slice().reverse();
  }
  new_note = "";
  title = "";
  note = ""; 
  columns:any = [[], [], [], [], []];


  constructor() {
    console.log("Welcome to keep notes");
    
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

  enterPressed(event:any) {
    if (event.key === "Enter") {
        document.getElementById('noteArea')?.focus();
    }
  }

  

  startTyping() {
    this.new_note = " "
    setTimeout(() => {
      document.getElementById('noteArea')?.focus();
    });
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
    this.note = this.new_note.trim();
    const noteId = this.notes.length !== 0 ? this.notes[this.notes.length -1].id : 0;
    const noteObj = {id: noteId + 1, title: this.title, note: this.note, color: this.noteBackground, background: this.noteBgImage};
    
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
    let pinnedNoteIndex = this.pinned.findIndex((note) => note.id === noteId);
    
    if(noteIndex !== -1) {
      this.notes[noteIndex].title = this.title;
      this.notes[noteIndex].note = this.note;
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }else if(pinnedNoteIndex !== -1) {
      this.pinned[pinnedNoteIndex].title = this.title;
      this.pinned[pinnedNoteIndex].note = this.note;
      localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
    }
    this.currentlyEditing = false;
    this.currentEditNode = {};
    this.resetColumns();
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
    localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.reversedPinned = this.pinned.slice().reverse();
    this.resetColumns();
    
  }

  unpin(note:any) {
    this.pinned = this.pinned.filter((pinnedNote) => pinnedNote.id !== note.id);
    this.reversedPinned = this.pinned.slice().reverse();
    localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
    note = {...note, id: this.notes[this.notes.length -1].id + 1}; 
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.resetColumns();
  }

  canvas = false;
  activeCanvasIndex: number = -1;
  activeNoteIndex:number | null = null;

  showCanvas(index:any) {   
    // if (typeof(index) == "object") {
    //   this.activeNoteIndex = this.notes.findIndex((note, id) => note.id === index.id)
    //   this.activeCanvasIndex = this.activeNoteIndex;
    // }else {
    //   this.activeCanvasIndex = index;
    // }
    this.canvas = true;
    
  }

  noteBackground = "#202124"
  colors = ['#202124', '#77172E', '#692B17', '#7C4A03', '#264D3B', '#0C625D', '#256377', '#284255', '#472E5B', '#6C394F', '#4B443A', '#232427'];

  pickColour(item:any) {
    console.log(this.activeCanvasIndex);
    
    this.noteBackground = item;
    this.canvas = false;
    this.noteBgImage =""

    
    // let pin = this.pinned[this.activeCanvasIndex]
    // pin = {id: pin.id, title: pin.title, note: pin.note, color : this.noteBackground};
   
    // this.pinned[this.activeCanvasIndex] = pin;
    // localStorage.setItem('pinnedNotes', JSON.stringify(this.pinned));
  }

  backgroundImages = ['1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg']

  noteBgImage = ""
  pickBackground(item:any) {
    this.noteBgImage = item;
    this.canvas = false;
    
  }
}
