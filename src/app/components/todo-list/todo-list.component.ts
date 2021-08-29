import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-page/login.service';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  taskList:any = [];
  addedValue:string = '';
  addActive = false;
  editValue:string = '';
  editActive = false;
  name:string = '';
  constructor(private todoListService: TodoListService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.name = this.loginService.name;
    if(!this.name) {
      this.getUserName()
    }
    this.getTasksList()
  }

  getUserName() {
    this.todoListService.getOwnProfile().subscribe((data:any) => {
    this.name = data.name;
    },error => [
      console.log(error)
    ])
  }

  getTasksList() {
    this.todoListService.getTasks().subscribe((data:any) => {
     // console.log(data);
      // this.taskList = data;
      this.taskList = [];
      data.forEach(item => {
        this.taskList.push({task:item, edit:false, add:false})
      })
      this.sortTasksByOrder()
    },error => {
      console.log(error)
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if(this.taskList[event.currentIndex].task.completed) return;
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
    this.postSortedTasks()
  }

  addTask() {
    this.addActive = true;
  }

  taskSelected(value,index) {
   this.taskList[index].task.completed = value;
   this.sortTaskList()
  }

  sortTaskList() {
    let completedItems:any = [];
    let todoItems:any = [];

    for(let i = 0; i<this.taskList.length; i++) {
      if(this.taskList[i].task.completed) {
        completedItems.push(this.taskList[i])
      }
      else {
        todoItems.push(this.taskList[i])
      }
    }

    this.taskList = todoItems.concat(completedItems);
    this.postSortedTasks()
  }

  postSortedTasks(offset = 1) {
    let payload = this.taskList.map((item,index) => {
      item.task.position = index+offset;
      return item.task;
    })
    this.todoListService.orderTasks(payload).subscribe((data:any) => {
      this.sortTasksByOrder();
      if(offset!=1) {
        this.saveTask()
      }
    })
  }

  sortTasksByOrder() {
    this.taskList.sort(function(a,b) {
      return a.task.position - b.task.position
    })
  }

  adjustOrderForSave() {
    this.postSortedTasks(2);
  }

  saveTask() {
    let payload = {
      description: this.addedValue,
      position: 1
    }
    this.todoListService.saveTask(payload).subscribe((data:any) => {
      this.cancelAdding()
      this.getTasksList();
    },(error) => {
      console.log(error);
    })
  }

  cancelAdding() {
    this.addActive = false;
  }

  deleteTask(id) {
    this.todoListService.deleteTask(id).subscribe((data:any) => {
      this.getTasksList()
    },error => {
      console.log(error)
    })
  }

  editTask(index) {
    this.editValue = this.taskList[index].task.description;
    this.taskList[index].edit = true;
    this.editActive = true;
  }

  cancelEdit(index) {
    this.taskList[index].edit = false;
    this.editActive = false;
  }

  saveEdit(i) {
    let id = this.taskList[i].task._id;
    let payload = {
      description: this.editValue
    }
    this.todoListService.editTask(id,payload).subscribe((data:any) => {
      this.cancelEdit(i)
      this.getTasksList()
    },error => {
      console.log(error)
    })
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }


  logout() {
    this.loginService.logout().subscribe((data:any) => {
      this.loginService.deleteAuthToken()
      this.navigateToLogin();
    },error => {
      console.log(error)
    })
  }
}
