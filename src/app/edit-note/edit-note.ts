import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  imports: [FormsModule],
  templateUrl: './edit-note.html',
  styleUrl: './edit-note.css'
})
export class EditNote implements OnInit{
  constructor(public activeRoute: ActivatedRoute) {}

  note:any = {};
  notes:any = []; 
  title = "";
  noteContent = ""
  ngOnInit(): void {
    const noteId = this.activeRoute.snapshot.params['id'];

    this.notes = JSON.parse(localStorage['notes']);

    const noteIndex = this.notes.findIndex((item:any) => item.id == noteId);
  
    this.note = this.notes[noteIndex];   
    this.title = this.note.title;
    this.noteContent = this.note.note;

    this.autoExpand();

  }

 

  autoExpand() {
    const editCard = document.querySelector('.edit-card') as HTMLElement;
    const noteBox = document.querySelector('.note') as HTMLElement;
    const titleBox = document.querySelector('.title') as HTMLElement;

  
    // editCard.style.height = "auto";
    editCard.style.height = titleBox.scrollHeight + noteBox.scrollHeight + 50 + 'px';

    if (this.noteContent.length > 1200) {
      editCard.style.overflowY = 'auto'
    }else {
      console.log(this.title.length);
      
    }

  }
    
    


  // public, private, protected*


}
