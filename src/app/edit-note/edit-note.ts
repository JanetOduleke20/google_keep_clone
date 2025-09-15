import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  imports: [FormsModule],
  templateUrl: './edit-note.html',
  styleUrl: './edit-note.css'
})
export class EditNote implements OnInit{
  constructor(public activeRoute: ActivatedRoute, public router: Router) {
    console.log("Welcome 1");
  }



  note:any = {};
  notes:any = []; 
  title = "";
  noteContent = "";
  noteIndex:any = null;
  ngOnInit(): void {
    
    const noteId = this.activeRoute.snapshot.params['id'];

    this.notes = JSON.parse(localStorage['notes']);

    this.noteIndex = this.notes.findIndex((item:any) => item.id == noteId);

    
    
    this.note = this.notes[this.noteIndex];   
    console.log(this.note);
    this.title = this.note.title;
    this.noteContent = this.note.note;

    // this.autoExpand();

    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }
  
  
  handleClickOutside(event:any) {
    const editCard = document.querySelector('.edit-card') as HTMLElement;

    if (editCard && !editCard.contains(event.target)) {
      this.editNote();
      // this.title = "";
      // this.noteContent = "";
      
    }
  }
 
  autoExpand() {
    const editCard = document.querySelector('.edit-card') as HTMLElement;
    const noteBox = document.querySelector('.note') as HTMLTextAreaElement;
    const titleBox = document.querySelector('.title') as HTMLElement;

  
    editCard.style.height = "auto";
    noteBox.style.height = "auto";
    noteBox.style.height = noteBox.scrollHeight + 'px';
    editCard.style.height = titleBox.scrollHeight + noteBox.scrollHeight + 50 + 'px';


    // if (this.noteContent.length > 1200) {
    //   editCard.style.overflowY = 'auto'
    // }else {
    //   console.log(this.title.length);
      
    // }

  }
    

  

  async editNote() {
    console.log(this.noteContent);
    
    this.notes[this.noteIndex] = {id: this.note.id, title:  this.title, note: this.noteContent, color: this.note.color, background: this.note.background};

    setTimeout(() => {
      localStorage.setItem('notes', JSON.stringify(this.notes));

    }, 3000);

    
     this.router.navigate(['/']);
  }
    

 

  // public, private, protected*


}
