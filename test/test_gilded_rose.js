var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose Kata", function() {

  describe("sellIn should", function() {
    it("decrement ", function() {
      const shop = new Shop([ new Item("foo", 10, 0) ]);
      const items = shop.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });
    it("decrement to 0", function() {
      const shop = new Shop([ new Item("foo", 1, 0) ]);
      const items = shop.updateQuality();
      expect(items[0].sellIn).to.equal(0);
    });
    it("decrement to negative", function() {
      const shop = new Shop([ new Item("foo", 0, 0) ]);
      const items = shop.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
    });
    it("stay if is Sulfuras", function() {
      const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
      const items = shop.updateQuality();
      expect(items[0].sellIn).to.equal(0);
    });

});

  describe("Quality should", function() {
    describe("not be negative", function() {
      it("and thow error when it finds one negative", function() {
        const shop = new Shop([ new Item("foo", 10, -5) ]);
        var items;
        var error= '';
        try{
       items = shop.updateQuality();
        }catch (e){
          error= e;
        }

        expect(error).to.equal("the quality can not be negative");
      });
      it("and keep normal when it is positive", function() {
        const shop = new Shop([ new Item("foo", 10, 5) ]);
        var items;
        var error= '';
        try{
       items = shop.updateQuality();
        }catch (e){
          error= e;
        }
        expect(error).to.equal("");
      });

    });
    describe("not be over 50", function() {
      it("and thow error when it finds one over 50", function() {
        const shop = new Shop([ new Item("foo", 10, 59) ]);
        var items;
        var error= '';
        try{
       items = shop.updateQuality();
        }catch (e){
          error= e;
        }
        expect(error).to.equal("the quality can not be over 50");
      });
      it("and keep normal when it is under 50", function() {
        const shop = new Shop([ new Item("foo", 10, 5) ]);
        var items;
        var error= '';
        try{
       items = shop.updateQuality();
        }catch (e){
          error= e;
        }
        expect(error).to.equal("");
      });

    });

    describe("decrement", function() {
      describe("for normal items ", function(){
        it("by 1 ", function() {
          const shop = new Shop([ new Item("foo", 10, 5) ]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(4);
        });
        it("by 2 after  date ", function() {
          const shop = new Shop([ new Item("foo", -10, 5) ]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(3);
        });
      });
      describe("for conjured items ", function(){
        it("by 2", function() {
          const shop = new Shop([ new Item("Conjured Spicy Venom", 34, 4) ]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(2);
        });
        it("by 4 after  date ", function() {
          const shop = new Shop([ new Item("Conjured Spicy Venom", -34, 49) ]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(45);
        });
      });

    });

    describe("for Sulfuras", function() {
      it("stay", function() {
        const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
        const items = shop.updateQuality();
        expect(items[0].quality).to.equal(80);
      });
    });

    describe("increment", function(){
      describe("for Brie", function() {
        it("in 1", function() {
          const shop = new Shop([new Item("Aged Brie", 2, 0)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(1);
        });
        it("in 2", function() {
          const shop = new Shop([new Item("Aged Brie", -1, 10)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(12);
        });
        it("don't go over 50", function() {
          const shop = new Shop([new Item("Aged Brie", 0, 49)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(50);
        });
        it("don't go over 50 after date", function() {
          const shop = new Shop([new Item("Aged Brie", -27, 50)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(50);
        });
      });
      describe("for Backtage", function(){
        it("in 1", function() {
          const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(21);
        });
        it("in 2", function() {
          const shop = new Shop([  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(42);
        });
        it("in 3", function() {
          const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(42);
        });
        it("don't go over 50", function() {
          const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(50);
        });

      });
    });

    describe("go to 0", function(){
      it("for Backtage after date", function() {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]);
        const items = shop.updateQuality();
        expect(items[0].quality).to.equal(0);
      });
      describe("for normal items ", function(){
        it("with quality 1", function() {
          const shop = new Shop([ new Item("foo", 1, 1) ]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(0);
        });
        it("with quality 2 after date", function() {
          const shop = new Shop([ new Item("foo", -39, 2) ]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(0);
        });
        it("and stay if quality is 0 ", function() {
          const shop = new Shop([new Item("pepe", 5, 0)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(0);
        });
      });
      describe("for conjured items", function(){
        it("with quality 2", function() {
          const shop = new Shop([ new Item("Conjured Mana Cake", 3, 2)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(0);
        });
        it("with quality 4 after date", function() {
          const shop = new Shop([ new Item("Conjured Mana Cake", -3, 4)]);
          const items = shop.updateQuality();
          expect(items[0].quality).to.equal(0);
        });
      });
    });

  });

});

