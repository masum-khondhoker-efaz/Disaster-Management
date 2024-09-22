import express from "express";

import AuthenticationMiddleware from "../app/middlewares/AuthenticationMiddleware.js";
import * as UsersController from "../app/controllers/UsersController.js";
import * as DonationsController from "../app/controllers/DonationsController.js";

import * as CrisesController from "../app/controllers/CrisesController.js";
import * as AdminController from "../app/controllers/AdminController.js";
import * as TasksController from "../app/controllers/TasksController.js";
import * as reliefInventoryController from "../app/controllers/reliefInventoryController.js";
import * as expenseInventoryController from "../app/controllers/expenseInventoryController.js";
import * as ChartController from "../app/controllers/ChartController.js";
import {availableVolunteersController} from "../app/controllers/TasksController.js";
import {approveCrises, fetchCrisis, listCrises, removeCrises} from "../app/controllers/CrisesController.js";
import {listCrisesAdmin, rejectVolunteer} from "../app/controllers/AdminController.js";
const router = express.Router();




// User registration route
router.post('/register', UsersController.handleRegister);

// User login route
router.post('/login', UsersController.handleLogin);

// Route to submit a donation
router.post('/donate',AuthenticationMiddleware, DonationsController.donate);

// Route to get total funds (can be public or protected based on your design)
router.get('/funds', DonationsController.getFunds);

// Add a new crisis (accessible to anonymous users)
//router.post('/crises', CrisesController.createCrisis);

// Get all crises
router.get('/crisesByList',  CrisesController.listCrises);
router.get('/adminCrisesByList',AuthenticationMiddleware,  AdminController.listCrisesAdmin);
router.post('/approve-crises/:id',AuthenticationMiddleware,  CrisesController.approveCrises);
router.post('/delete-crisis/:id',AuthenticationMiddleware,  CrisesController.removeCrises);
// Get a specific crisis by ID

router.get('/crisis/:id', CrisesController.fetchCrisis);

// Admin control
router.get('/volunteers/unverified',AuthenticationMiddleware, AdminController.getUnverifiedVolunteers);
router.post('/volunteers/verify/:id',AuthenticationMiddleware, AdminController.verifyVolunteer);
router.post('/volunteers/reject/:id',AuthenticationMiddleware, AdminController.rejectVolunteer);
router.post('/volunteers/approve/:id', AdminController.approveVolunteer);
router.get('/volunteers/approved', AdminController.getApprovedVolunteer);
router.post('/assign-tasks', AdminController.assignTasksToVolunteers);

// Admin can create a task
router.post('/createtasks', AuthenticationMiddleware, TasksController.createTaskController);

// Admin assigns volunteers to a task
router.post('/tasks/assign', AuthenticationMiddleware, TasksController.assignVolunteersController);

router.get('/tasks/available', TasksController.listAvailableTasksController);

router.get('/available-volunteers', TasksController.availableVolunteersController);




// Relief Inventory Routes
router.post('/relief/add',AuthenticationMiddleware, reliefInventoryController.addReliefInventory);  // Add a new
// relief item
router.get('/relief/list', reliefInventoryController.listReliefInventory);  // List all relief items
router.delete('/relief/remove/:id',AuthenticationMiddleware, reliefInventoryController.removeReliefInventory);  // Remove a specific relief item by ID

// Expense Inventory Routes
router.post('/expense/add',AuthenticationMiddleware, expenseInventoryController.addExpenseInventory);  // Add a new
// expense item
router.get('/expense/list', expenseInventoryController.listExpenseInventory);  // List all expense items
router.delete('/expense/remove/:id', AuthenticationMiddleware, expenseInventoryController.removeExpenseInventory);  // Remove a specific expense item by ID


// Route to get daily funds and expenses
router.get('/daily-funds-expenses', ChartController.dailyFundsAndExpensesReport);





export default router;