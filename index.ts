#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBal = 9000; // Rs
let myPin = 12345;
let accName = "Saqib Samar";
let mobNumber = "03004046478";
let mobileCompany: any = {
  Ufone: {
    DailyBundleDataPack: 100,
    DailyBundleSocialPack: 50,
    DailyBundleExecutive: 200,
    WeeklyBundleDataPack: 1000,
    WeeklyBundleSocialPack: 500,
    WeeklyBundleExecutive: 2000,
    MonthlyBundleDataPack: 3000,
    MonthlyBundleSocialPack: 5000,
    MonthlyBundleExecutive: 3000,
  },
  Warid: {
    DailyBundleDataPack: 120,
    DailyBundleSocialPack: 60,
    DailyBundleExecutive: 220,
    WeeklyBundleDataPack: 1200,
    WeeklyBundleSocialPack: 550,
    WeeklyBundleExecutive: 2200,
    MonthlyBundleDataPack: 3300,
    MonthlyBundleSocialPack: 5500,
    MonthlyBundleExecutive: 4000,
  },
  Jazz: {
    DailyBundleDataPack: 60,
    DailyBundleSocialPack: 90,
    DailyBundleExecutive: 150,
    WeeklyBundleDataPack: 600,
    WeeklyBundleSocialPack: 900,
    WeeklyBundleExecutive: 1700,
    MonthlyBundleDataPack: 4500,
    MonthlyBundleSocialPack: 2300,
    MonthlyBundleExecutive: 5000,
  },
  Zong: {
    DailyBundleDataPack: 40,
    DailyBundleSocialPack: 90,
    DailyBundleExecutive: 150,
    WeeklyBundleDataPack: 600,
    WeeklyBundleSocialPack: 900,
    WeeklyBundleExecutive: 1700,
    MonthlyBundleDataPack: 4500,
    MonthlyBundleSocialPack: 2300,
    MonthlyBundleExecutive: 5000,
  },
};

let condition = true;
while (condition) {
  let pinAnswer = await inquirer.prompt({
    type: "number",
    name: "pinCode",
    message: chalk.blue.bold("Enter Five Digit Pin Code"),
  });

  if (pinAnswer.pinCode === myPin) {
    console.log(
      chalk.bgBlue(
        `\t\nWELCOME TO EASYPAISA \t\nName:${accName}\nMobile:${mobNumber}\nBalance:${myBal}`
      )
    );

    let optAnswer = await inquirer.prompt([
      {
        name: "option",
        type: "list",
        message: chalk.blue.bold("Please Select Option"),
        choices: ["Send Money", "Bill Payment", "Mobile Package", "Exit"],
       
      },
    ]);
    if (optAnswer.option === "Send Money") {
      let sendMoney = await inquirer.prompt([
        {
          name: "sendmoney",
          type: "list",
          message: chalk.yellow.bold("Please Select One And Press Enter"),
          choices: ["bank transfer", "easypaisa transfer", "cnic transfer"],
        },
      ]);
      if (sendMoney.sendmoney === "bank transfer") {
        let transferAnswer = await inquirer.prompt([
          {
            name: "bankname",
            type: "list",
            message: chalk.yellow.bold("Please Select Bank"),
            choices: ["UBL", "MCB", "HBL", "ABL", "BAHL", "BAFL"],
          },
          {
            name: "transferTo",
            type: "input",
            message: "Enter Receiver's Account Number",
          },
          {
            name: "transferamount",
            type: "number",
            message: chalk.white.bold("Please Enter Amount"),
          },
        ]);
        if (transferAnswer.transferamount <= myBal) {
          myBal -= transferAnswer.transferamount;
          console.log(
            chalk.green.bold("\t\n Thank You For This Transaction \t\n"),
            chalk.white.bold.underline(`Your Remaning Balance Is Rs.${myBal}`)
          );
        } else {
          console.log(chalk.bgRed("You Have Insufficient Balance"));
        }
      } else if (sendMoney.sendmoney === "easypaisa transfer") {
        console.log(
          chalk.green.bold("Please Enter Receiver's Mobile Number And Amount")
        );

        let receipientNumber = await inquirer.prompt({
          name: "receipient",
          type: "input",
          message: chalk.white.bold("Enter Receiver's Mobile Number"),
        });
        if (receipientNumber.receipient.length == mobNumber.length) {
          let easyPaisaAmount = await inquirer.prompt({
            name: "easyPaisaAmount",
            type: "number",
            message: chalk.white.bold("Please Enter Amount"),
          });
          if (easyPaisaAmount.easyPaisaAmount <= myBal) {
            myBal -= easyPaisaAmount.easyPaisaAmount;
            console.log(
              chalk.green.bold.underline(
                "\t\n Thank You For This Transaction \t\n"
              ),
              chalk.white.bold.underline(`Your remaning Balance Is Rs.${myBal}`)
            );
          } else {
            console.log(chalk.bgRed("You Have Insufficient Balance"));
          }
        } else {
          console.log("Please Enter Correct Mobile Number");
        }
      } else if (sendMoney.sendmoney === "cnic transfer") {
        let cnicAnswer = await inquirer.prompt([
          {
            name: "cnicNumber",
            type: "number",
            message: chalk.green.bold("Please Enter Receiver's CNIC Number"),
          },
          {
            name: "cnicAmount",
            type: "number",
            message: chalk.green.bold("Please Enter Amount"),
          },
        ]);
        if (cnicAnswer.cnicAmount <= myBal) {
          myBal -= cnicAnswer.cnicAmount;
          console.log(
            chalk.green.bold.underline(
              "\t\n Thank You For This Transaction \t\n"
            ),
            chalk.white.bold.underline(`Your remaning Balance Is Rs.${myBal}`)
          );
        } else {
          console.log(chalk.bgRed("You Have Insufficient Balance"));
        }
      }
    } else if (optAnswer.option === "Bill Payment") {
      let billPayment = await inquirer.prompt([
        {
          name: "bill",
          type: "list",
          message: chalk.yellow.bold("Please Select Bank"),
          choices: ["KESC", "SSGC", "PTCL", "KWSB"],
        },
        {
          name: "paymentto",
          type: "input",
          message: "Enter Receiver's Account Number",
        },
        {
          name: "consumer",
          type: "input",
          message: "Enter Consumer Number",
        },
        {
          name: "paymentamount",
          type: "number",
          message: chalk.white.bold("Please Enter Amount"),
        },
      ]);
      if (billPayment.paymentamount <= myBal) {
        myBal -= billPayment.paymentamount;
        console.log(
          chalk.green.bold("\t\n Thank You For This Transaction \t\n"),
          chalk.white.bold.underline(`Your Remaning Balance Is Rs.${myBal}`)
        );
      } else {
        console.log(chalk.bgRed("You Have Insufficient Balance"));
      }
    } else if (optAnswer.option === "Mobile Package") {
      let mobilePkg: {
        company: "Ufone" | "Warid" | "Jazz" | "Zong";
        bundle:
          | "DailyBundleDataPack"
          | "DailyBundleSocialPack"
          | "DailyBundleExecutive"
          | "WeeklyBundleDataPack"
          | "WeeklyBundleSocialPack"
          | "WeeklyBundleExecutive"
          | "MonthlyBundleDataPack"
          | "MonthlyBundleSocialPack"
          | "MonthlyBundleExecutive";
      } = await inquirer.prompt([
        {
          name: "company",
          type: "list",
          message: chalk.yellow.bold("Please Select Company"),
          choices: ["Ufone", "Warid", "Jazz", "Zong"],
        },
        {
          name: "bundle",
          type: "list",
          message: "Please Select Bundle",
          choices: [
            "DailyBundleDataPack",
            "DailyBundleSocialPack",
            "DailyBundleExecutive",
            "WeeklyBundleDataPack",
            "WeeklyBundleSocialPack",
            "WeeklyBundleExecutive",
            "MonthlyBundleDataPack",
            "MonthlyBundleSocialPack",
            "MonthlyBundleExecutive",
          ],
        },
        {
          name: "mobileNumber",
          type: "number",
          message: chalk.white.bold("Please Enter Mobile Number"),
        },
      ]);

      if (mobilePkg.company && mobilePkg.bundle) {
        let result = mobileCompany[mobilePkg.company][mobilePkg.bundle];
        if (result <= myBal) {
          myBal -= result;
          console.log(
            chalk.green.bold("\t\n Thank You For This Transaction \t\n"),
            chalk.white.bold.underline(`Your Remaning Balance Is Rs.${myBal}`)
          );
        } else {
          console.log(chalk.bgRed("You Have Insufficient Balance"));
        }
      }
    } else if (optAnswer.option === "Exit") {
      let optAnswer = await inquirer.prompt({
        name: "exit",
        type: "confirm",
        message: chalk.blue.bold(
          `If you want to perform another transaction please enter "Y" for exit please enter "N"`
        ),
        default: false,
      });
      condition = optAnswer.exit;
    } else {
      console.log(chalk.bgRed("Timed out"));
    }
  } else {
    console.log(chalk.bgRed("Invalid pin code, please enter correct pin code"));
  }
}
