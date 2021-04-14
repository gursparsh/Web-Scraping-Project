const puppy = require("puppeteer");
const location = "New Delhi";
const location1 = "New Delhi, Delhi, India";
const restaurant = "Sandoz";
const dish = "Dahi";




async function main(){
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.setDefaultNavigationTimeout(0)
    await tab.goto('https://www.swiggy.com/restaurants');
    await tab.waitForSelector("._381fS._1oTLG._3BIgv", {visible: true});
    await tab.click("._381fS._1oTLG._3BIgv");
    await tab.type("._381fS._1oTLG._3BIgv", location);
    await tab.waitForSelector("._2W-T9", {visible: true});
    await tab.click("._2W-T9");
    await tab.waitForNavigation({waitUntil: "networkidle0"});
    await tab.goto("https://www.swiggy.com/search");


    await tab.waitForSelector("._2BJMh", {visible: true});
    await tab.click("._2BJMh");
    await tab.type("._2BJMh", restaurant);
    
    await tab.waitForSelector(".GPl4U", {visible: true});
    await tab.click(".GPl4U");

    await tab.waitForSelector("._2wXvU", {visible: true});
    await tab.click("._2wXvU");

    let dishestabs = await tab.$$("._2pQzW button");
    await dishestabs[1].click();
    
    
    await tab.waitForSelector("._2H8LW", {visible: true});
    await tab.click("._2H8LW");
    
    await tab.waitForSelector("._5mXmk", {visible: true});
    await tab.click("._5mXmk");
    await tab.type("._5mXmk", dish);

    await tab.waitForSelector("#h-1741698364 .rupee", {visible: true});
    let price = await tab.$$("#h-1741698364 .rupee");
    let rate1 = await tab.evaluate(function(ele){
            return ele.textContent;
    },price[0]);
     
    await tab.waitForSelector("#h-1741698364 ._1RPOp", {visible: true});
    await tab.click("#h-1741698364 ._1RPOp");

    await tab.waitForSelector("._3coNr", {visible: true});
    await tab.click("._3coNr");
    
    await tab.waitForSelector("._1gPB7", {visible: true});
    await tab.click("._1gPB7");


    await tab.waitForSelector("._3ZAW1", {visible: true});
    let total = await tab.$$("._3ZAW1");
    let rate2 = await tab.evaluate(function(ele){
            return ele.textContent;
    },total[0]);

    await tab.goto("https://www.google.com/maps/@28.9055969,79.5059003,14z");

    await tab.waitForSelector(".searchbox-directions-container");
    await tab.click(".searchbox-directions-container");

    await tab.waitForSelector("#sb_ifc51",{visible:true});
    await tab.click("#sb_ifc51");
    await tab.type("#sb_ifc51" ,location1);
    await tab.keyboard.press("Enter");
    await tab.type("#sb_ifc52",restaurant);
    await tab.keyboard.press("Enter");

    await tab.waitForSelector(".section-directions-trip-duration.delay-medium",{visible: true});
    let loc = await tab.$$(".section-directions-trip-duration.delay-medium");
    let time = await tab.evaluate(function(ele){
            return ele.textContent;
    },loc[0]);
    
    console.log("The total price if walk in is ₹ "+ rate1);
    console.log("You can go and pick your food from restaurant in" + time );
    console.log("The total price if you want home delivery is ₹ "+ rate2);
    

}

main();
