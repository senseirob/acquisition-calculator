
function assignValues() {

    //this grabs the value that you put your form
    const name = document.getElementById('name').value,
        price = document.getElementById('price').value,
        annualincome = document.getElementById('annual_income').value,
        annualprojection = document.getElementById('annual_projection').value

    const Business = new Business(name, price, annualincome, annualprojection);

    const ui = new UI
}
 
// Event listener for Add book 
document.getElementById('business-form').addEventListener('submit',{
   
    function(e) {

        //this grabs the value that you put your form
        const name = document.getElementById('name').value,
              price = document.getElementById('price').value,
              annualincome = document.getElementById('annual_income').value,
              annualprojection = document.getElementById('annual_projection').value

        //this creates a new object from those values
        const Business = new Business(name, price, annualincome, annualprojection);
    
        //this creates a new object that you can display in the UI
        const ui = new UI();
    }
});



function Business (name, price, annualincome, annualprojection) {
    
    //THE VARIABLES THE CALCULATOR WILL TAKE IN

    this.name = name;
    this.price = price; 
    this.annualincome = annualincome;
    this.annualprojection = annualprojection;

    //FUNCTIONS: LOAN ------------------------

    this.total_loan_amount = function() {
        return (this.price * 1.15).toFixed(2);
    }

    this.down_payment = function() {
        return (this.price *.1).toFixed(2);
    }

    this.monthly_income = function() {
        return (this.annualincome / 12).toFixed(2);
    }

    //FUNCTIONS:BREAKEVEN --------------------

    this.break_even_time = function() {
        return (this.down_payment() / this.monthly_net_income()).toFixed(2);
    }

    this.break_even_time_years = function() {
        return (this.break_even_time()/12).toFixed(2);
    }

    this.multiple = function() {
        return (this.price / this.annualincome).toFixed(2);
    }

    this.cash_on_cash = function() {
        return (this.annual_net_income() / this.down_payment()).toFixed(2);
    }

    //FUNCTIONS: DEBT -----------------------

    this.monthly_debt_service = function() {
        return ((this.total_loan_amount() - this.down_payment())/74).toFixed(2);
    }

    this.annual_debt_service = function() {
        return (this.monthly_debt_service()*12).toFixed(2);
    }

    this.monthly_net_income = function() {
        return (this.monthly_income() - this.monthly_debt_service()).toFixed(2);
    }

    this.annual_net_income = function() {
        return (this.monthly_net_income() *12).toFixed(2);
    }

    this.debt_coverage_ratio = function() {
        return (this.monthly_income() / this.monthly_debt_service()).toFixed(2);
    }

    //FUNCTIONS: PROJECTIONS ----------------

    this.monthly_income_projection = function() {
        return (this.annualprojection / 12).toFixed(2);
    }

    this.annual_projection_less_debt = function() {
        return (this.annualprojection - this.annual_debt_service()).toFixed(2);
    }

    this.cash_on_cash_projection = function() {
        return (this.annual_projection_less_debt() / this.down_payment()).toFixed(2);
    }

    this.five_year_estimate = function() {
        return ((this.annual_projection_less_debt() * 5) * .67);
    }

    //EXIT ESTIMATES ----------------------

    this.exit_multiple = function() {
        return (this.multiple() * 1.23);
    }

    this.exit_price = function() {
        return (this.annualprojection * this.exit_multiple());
    }

    this.take_home = function() {
        return (this.exit_price() - (this.price * .5));
    }

    this.total_five_year_income = function() {
        return (this.five_year_estimate() + this.take_home());
    }

    this.five_year_annual_income = function() {
        return (this.total_five_year_income() / 5);
    } 
    
    this.money_multiplied = function() {
        return (this.total_five_year_income() / this.down_payment());
    }

    // this.to_usd = function() {
    //     return (this.replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    // }

    //Log the business 

    this.run_the_numbers = function () {

        // BASICS

        document.getElementById("business_name").innerHTML = this.name;
        document.getElementById("sale_price").innerHTML = this.price;
        document.getElementById("total_loan_amount").innerHTML = this.total_loan_amount();
        document.getElementById("down_payment").innerHTML = this.down_payment();
        document.getElementById("monthly_income").innerHTML = this.monthly_income();

        //LOAN INFORMATION
    
        document.getElementById("break_even_time_months").innerHTML = this.break_even_time();
        document.getElementById("break_even_time_years").innerHTML = this.break_even_time_years();
        document.getElementById("multiple").innerHTML = this.multiple();
        document.getElementById("cash_on_cash").innerHTML = this.cash_on_cash();
        document.getElementById("monthly_debt_service").innerHTML = this.monthly_debt_service();
        document.getElementById("monthly_net_income").innerHTML = this.monthly_net_income();
        document.getElementById("annual_net_income").innerHTML = this.annual_net_income();
        document.getElementById("debt_coverage_ratio").innerHTML = this.debt_coverage_ratio();

        //Projections

        document.getElementById("annual_income_projection").innerHTML = this.annualprojection;
        document.getElementById("monthly_income_projection").innerHTML = this.monthly_income_projection();
        document.getElementById("annual_income_less_debt").innerHTML = this.annual_net_income();
        document.getElementById("cash_on_cash_projection").innerHTML = this.cash_on_cash_projection();

        //5 Year Estimate

        document.getElementById("five_year_income_estimate").innerHTML = this.five_year_estimate();
        document.getElementById("exit_multiple").innerHTML = this.exit_multiple();
        document.getElementById("exit_price").innerHTML = this.exit_price();
        document.getElementById("exit_take_home").innerHTML = this.take_home();
        document.getElementById("total_five_year_income").innerHTML = this.total_five_year_income();
        document.getElementById("annualized_five_year_income").innerHTML = this.five_year_annual_income();
        document.getElementById("money_multiplied").innerHTML = this.money_multiplied();



        console.log(`Business Name: ${this.name}`);
        console.log(`Total Price: $${this.price}`);
    
        console.log(`Total Loan Amount: $${this.total_loan_amount()}`);
        console.log(`Down Payment: $${this.down_payment()}`);
        console.log(`Monhtly Income: $${this.monthly_income()}`);
    
        console.log(`Break Even Time (months): ${this.break_even_time()} months`);
        console.log(`Break Even Time (years): ${this.break_even_time_years()} years`);
        console.log(`Multiple: ${this.multiple()}`);
        console.log(`Cash on Cash: ${this.cash_on_cash()}%`);
    
        console.log(`Monthly Debt Service: $${this.monthly_debt_service()}`);
        console.log(`Annual Debt Service: $${this.annual_debt_service()}`);
        console.log(`Monhtly Net Income: $${this.monthly_net_income()}`);
        console.log(`Annual Net Income: $${this.annual_net_income()}`);
        console.log(`Debt Coverage Ratio: ${this.debt_coverage_ratio()}`);
    
        console.log(`Annual Income Projection: $${this.annualprojection}`);
        console.log(`Monthly Income Projection: $${this.monthly_income_projection()}`);
        console.log(`Annual Income (less debt): $${this.annual_projection_less_debt()}`);
        console.log(`Cash on Cash Projection: ${this.cash_on_cash_projection()}%`);
        console.log(`5 Year Income Estimate: $${this.five_year_estimate()}`);
    
        console.log(`Exit Multiple: ${this.exit_multiple()} X`);
        console.log(`Exit Price: $${this.exit_price()}`);
        console.log(`Exit Take Home: $${this.take_home()}`);
        console.log(`Total 5 Year Income: $${this.total_five_year_income()}`);
        console.log(`Annualized 5 Year Income: $${this.five_year_annual_income()}`);
        console.log(`Money Multiplied: ${this.money_multiplied()} X`);

    }
    
}


//UI Constructor 
function UI() {}

//Add business to list 
UI.prototype.addBusinessToList = function(business){
    const populate = document.getElementById('business_data');

    populate.innerHTML = `
        <ul>    
            <li> Business Name: ${business.name}</span></li>
        </ul>
    `;
}




let business1 = new Business("GitHub SAAS Tool", 4126000, 1213000, 3000000);
let business2 = new Business("Peer to Peer Code Review", 1466000, 327000, 650000)

// PRINT OUTS OF THE DATA
// Format these into financial numbers $1,000 - not $1000

//ZANA