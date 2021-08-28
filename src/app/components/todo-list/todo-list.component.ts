import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  taskList:any = [];
  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.getTasksList()
  }

  getTasksList() {
    this.todoListService.getTasks().subscribe(data => {
      console.log(data);
      this.taskList = data;
    },error => {
      console.log(error)
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
    console.log(this.taskList)
  }

}
