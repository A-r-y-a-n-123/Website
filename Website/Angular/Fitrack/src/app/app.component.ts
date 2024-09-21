import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule], // added CommonModule for ngswitch
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  

export class AppComponent{
  isLoggedIn: boolean = false; // Initialize as false
  notificationMessages: string[] = [];
  title = 'Fitrack';
  purpose = 'Fitness tracking';
  currentcontent: string='start'; // default content
  formType: string = ''; // 'signup' or 'login'
  // Sign-Up Form Fields
  signupUsername: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  // Login Form Fields
  loginUsername: string = '';
  loginPassword: string = '';
  // workout timer
  workoutPhase: number = 0;
  workoutTimeLeft: number = 30; // seconds
  interval: any;
  // notification msg
  notificationMessage: string = '';


  showcontent(content:string){ // user def function
    this.currentcontent = content;
  }

  toggleZoom(event: MouseEvent){ // user def func with built-in methods
    const img = event.target as HTMLElement;
    img.classList.toggle('zoomin');
  }

  showForm(form: string) {
    this.formType = form;
  }

  onSignUp() {
    // Handle sign-up logic here
    console.log('Sign Up:', { username: this.signupUsername, email: this.signupEmail, password: this.signupPassword });
    this.formType = ''; // Hide form after submission
  }

  onLogin() {
    // Handle login logic here
    console.log('Login:', { username: this.loginUsername, password: this.loginPassword });
    this.formType = ''; // Hide form after submission
  }

  startWorkout() {
    this.workoutPhase = 1; // Start the first workout phase
    this.workoutTimeLeft = 30; 
    this.startCountdown();
  }

  startCountdown() {
    this.interval = setInterval(() => {
      this.workoutTimeLeft--;
      if (this.workoutTimeLeft === 0) {
        this.handlePhaseEnd();
      }
    }, 1000); // Decrease time every second
  }

  handlePhaseEnd() {
    clearInterval(this.interval);

    if (this.workoutPhase === 1) {
      const notificationMessage = 'Time to skip! Start your skipping workout!';
      this.notificationMessages.push(notificationMessage);
      setTimeout(() => {
        alert(notificationMessage);
      }, 1000); // Delay to display the message
  
      // After first workout phase, move to the second workout
      this.workoutPhase = 2;
      this.workoutTimeLeft = 30; //
      this.startCountdown();
    } else if (this.workoutPhase === 2) {
      // After second workout phase, show notifications
      this.showWorkoutSummary();
    }
  }

  showWorkoutSummary() {
    // Notification message
    this.notificationMessage = 'You have burned 1000 calories!';
    setTimeout(() => {
      const continueWorkout = confirm('You have burned 1000 calories! Want to continue?');
      if (continueWorkout) {
        this.currentcontent = 'start';
        alert("Let's go for another round!");
      } else {
        this.currentcontent = 'notifications';
      }
    }, 1000); // Delay to display the message
  }

  deleteNotifications() {
    this.notificationMessages = [];
  }


}

