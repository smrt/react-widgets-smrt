import React from 'react'
import tsp from 'teaspoon';

import Month from '../src/Month'

describe('Month Component', function(){

  it('should use the right format', () => {
    var date = new Date(2015, 1, 16, 0, 0, 0)
      , formatter = sinon.spy(() => 'hi')

    tsp(
      <Month
        value={date}
        focused={date}
        onChange={()=>{}}
        dateFormat='dd'
        dayFormat='d'
        activeId='month'
      />
    )
    .render()
    .tap(inst =>
      expect(inst.first('td').text()).to.equal('01')
    )
    .props({ dateFormat: '-d' })
    .tap(inst =>
      expect(inst.first('td').text()).to.equal('-1')
    )
    .props({ dateFormat: formatter, culture: 'en' })
    .tap(inst =>
      expect(inst.first('td').text()).to.equal('hi'))

    expect(formatter.called).to.equal(true);
    expect(formatter.args[0].length).to.equal(3);
    expect(formatter.args[0][0]).to.be.a('Date');
    expect(formatter.args[0][1]).to.be.a('string').and.to.equal('en');
  })
})
