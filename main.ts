import inquirer from 'inquirer';

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 100000;
  }

  enroll(course: string): void {
    this.courses.push(course);
  }

  viewBalance(): void {
    console.log(`Balance for ${this.name}: ${this.balance}`);
  }

  payFees(amount: number): void {
    this.balance -= amount;
    console.log(`Fees paid successfully for ${this.name}: ${amount}`);
  }

  showStatus(): void {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses.join(', ')}`);
    console.log(`Balance: ${this.balance}`);
  }
}

class StudentManager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  addStudent(name: string): void {
    let student = new Student(name);
    this.students.push(student);
    console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
  }

  enrollStudent(studentId: number, course: string): void {
    let student = this.findStudent(studentId);
    if (student) {
      student.enroll(course);
      console.log(`Student: ${student.name} enrolled in ${course} successfully`);
    } else {
      console.log("Student not found. Please enter a correct ID.");
    }
  }

  viewStudentBalance(studentId: number): void {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log("Student not found. Please enter a correct ID.");
    }
  }

  payStudentFees(studentId: number, amount: number): void {
    let student = this.findStudent(studentId);
    if (student) {
      student.payFees(amount);
    } else {
      console.log("Student not found. Please enter a correct ID.");
    }
  }

  showStudentStatus(studentId: number): void {
    let student = this.findStudent(studentId);
    if (student) {
      student.showStatus();
    } else {
      console.log("Student not found. Please enter a correct ID.");
    }
  }

  findStudent(studentId: number): Student | undefined {
    return this.students.find(student => student.id === studentId);
  }
}

const studentManager = new StudentManager();

async function main() {
  console.log("Welcome to AIGIC");
  console.log("_".repeat(50));

  while (true) {
    const choice = await inquirer.prompt([
      {
        name: "Choices",
        type: "list",
        message: "Select your option",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Status",
          "Exit",
        ]
      }
    ]);

    switch (choice.Choices) {
      case "Add Student":
        const nameInput = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter student name",
          }
        ]);
        studentManager.addStudent(nameInput.name);
        break;
      case "Enroll Student":
        const courseInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter course name",
          }
        ]);
        studentManager.enrollStudent(courseInput.studentId, courseInput.course);
        break;
      case "View Student Balance":
        const balanceInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          }
        ]);
        studentManager.viewStudentBalance(balanceInput.studentId);
        break;
      case "Pay Fees":
        const payInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter amount",
          }
        ]);
        studentManager.payStudentFees(payInput.studentId, payInput.amount);
        break;
      case "Show Status":
        const statusInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter student ID",
          }
        ]);
        studentManager.showStudentStatus(statusInput.studentId);
        break;
      case "Exit":
        console.log("Exiting...");
        process.exit();
    }
  }
}

main()