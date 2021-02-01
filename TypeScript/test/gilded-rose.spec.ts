import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import { should } from 'chai';

describe('Gilded Rose', function () {

    it('update quality', function() {
        // const gildedRose = new GildedRose([ new Item('fixme', 0, 0) ]);
        // const items = gildedRose.updateQuality();
        // expect(items[0].name).to.equal('fixme');
        
        const items = [
            new Item("+5 Dexterity Vest", 10, 20), //
            new Item("Aged Brie", 2, 0), //
            new Item("Elixir of the Mongoose", 5, 7), //
            new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        ]
        const gildedRose = new GildedRose(items);
            const updatedItems = gildedRose.updateQuality()
            expect(updatedItems).to.deep.include.members([
                new Item("+5 Dexterity Vest", 9, 19),
                new Item("Aged Brie", 1, 1),
                new Item("Elixir of the Mongoose", 4, 6),
                new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
                new Item("Sulfuras, Hand of Ragnaros", -1, 80),
                new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21),
                new Item("Backstage passes to a TAFKAL80ETC concert", 9, 50),
                new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50)

            ])
        })

             it('a backstage concert increases quality closer to the day', function () {
            const gildedRose = new GildedRose([new Item ("Backstage passes to a TAFKAL80ETC concert", 15, 20)])
            const updatedItems = gildedRose.updateQuality()
            expect(updatedItems).to.deep.include(new Item ("Backstage passes to a TAFKAL80ETC concert", 14, 21))
             
                
            
    });

    it('brie increases in value as time goes on', function () {
        const gildedRose = new GildedRose([new Item ("Aged Brie", 2, 0)])
        const updatedItems = gildedRose.updateQuality()
        expect(updatedItems).to.deep.include(new Item ("Aged Brie", 1, 1))
    })

  it('Once the sell by date has passed, Quality degrades twice as fast', function () {
        const items = [
            new Item("+5 Dexterity Vest", 0, 20), //
            new Item("Aged Brie", 0, 0), //
            new Item("Elixir of the Mongoose", 0, 7), //

        ]
        const gildedRose = new GildedRose(items);
            const updatedItems = gildedRose.updateQuality()
            expect(updatedItems).to.deep.include.members([
                new Item("+5 Dexterity Vest", -1, 18),
                new Item("Aged Brie", -1, 2),
                new Item("Elixir of the Mongoose", -1, 5),
  

            ])
  })

  it('Sulfuras never have to be sold or decrease in quality', function () {
    const gildedRose = new GildedRose([new Item ("Sulfuras, Hand of Ragnaros", 2, 80)])
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).to.deep.include(new Item ("Sulfuras, Hand of Ragnaros", 2, 80))
})

  it('The Quality of an item is never negative', function () {

const items = [
    new Item("+5 Dexterity Vest", 10, 0), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 0), //
    // new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    // new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),

]
const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).to.deep.include.members([
        new Item("+5 Dexterity Vest", 9, 0),
        new Item("Aged Brie", 1, 1),
        new Item("Elixir of the Mongoose", 4, 0),
        // new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
        // new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),

    ])
  })
  it('The Quality of an item is never more than 50', function () {

    const items = [
        new Item("Aged Brie", 2, 50), //
        new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50),
    ]
    const gildedRose = new GildedRose(items);
        const updatedItems = gildedRose.updateQuality()
        expect(updatedItems).to.deep.include.members([
            new Item("Aged Brie", 1, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50),
        ])
      })
//   "Conjured" items degrade in Quality twice as fast as normal items
}) 