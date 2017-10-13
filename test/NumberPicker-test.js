import React from 'react';
import tsp from 'teaspoon';
import NumberPicker from '../src/NumberPicker';

let ControlledNumberPicker = NumberPicker.ControlledComponent;

describe('NumberPicker', function(){

  it('should set values correctly', function() {
    let expectValueToBe = val =>
      inst => expect(inst.find('.rw-input').dom().value).to.equal(val)

    tsp(<NumberPicker value={15} format='D' onChange={()=>{}} />)
      .render()
        .tap(expectValueToBe('15'))
      .props({ value: null, min: 10, max: 10 })
        .tap(expectValueToBe(''))
      .props({ value: 1, min: 10 })
        .tap(expectValueToBe('10'))
      .props({ value: 20, max: 10 })
        .tap(expectValueToBe('10'))
      .props({ value: 10, format: 'c' })
        .tap(expectValueToBe('$10.00'))
  })

  it('should be able to accept a placeholder', function() {
    let input = tsp(
      <NumberPicker
        placeholder="enter number here"
        format='D'
        onChange={()=>{}}
      />
    )
    .render()
    .find('.rw-input')
    .dom()

     expect(input.placeholder).to.equal('enter number here');
  })

  it('should pass NAME down', function(){
    let input = tsp(<NumberPicker value={15} format='D' onChange={()=>{}} name='hello'/>)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.hasAttribute('name')).to.equal(true)
  })

  it('should not fire change until there is a valid value', function(){
    var change = sinon.spy()
    var input = tsp(<NumberPicker value={150} format='D' min={100} onChange={change} />)
      .render()
      .find('.rw-input')

    input.dom().value = '15'
    input.trigger('change')

    expect(change.called).to.equal(false);

    input.dom().value = '154'
    input.trigger('change')
    expect(change.calledOnce).to.equal(true);

    //should call change on a null value when no min
    change.reset()

    input = tsp(<NumberPicker value={15} format='D' min={-Infinity} onChange={change} />)
      .render()
      .find('.rw-input')

    input.dom().value = ''
    input.trigger('change')
    expect(change.calledOnce).to.equal(true)
  })

  it('should change value when spinner is clicked', function(){
    var changeSpy = sinon.spy();

    let inst = tsp(
      <NumberPicker
        value={1}
        format='D'
        onChange={changeSpy}
      />
    )
    .render();

    //increment
    inst.first('Button')
      .trigger('mouseDown')
      .trigger('mouseUp');

    expect(changeSpy.calledOnce).to.equal(true)
    expect(changeSpy.args[0][0]).to.equal(2)

    //decrement
    inst.last('Button')
      .trigger('mouseDown')
      .trigger('mouseUp');

    expect(changeSpy.calledTwice).to.equal(true)
    expect(changeSpy.args[1][0]).to.equal(0)
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<NumberPicker onBlur={blur} onFocus={focus}/>)
      .render()
      .trigger('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.trigger('blur')

          setTimeout(() => {
            expect(focus.calledOnce).to.equal(true)
            expect(blur.calledOnce).to.equal(true)
            done()
          })
        })
      });
  })

  it('should not trigger focus/blur events when disabled', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<NumberPicker disabled onBlur={blur} onFocus={focus}/>)
      .render()
      .trigger('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.trigger('blur')

          setTimeout(() => {
            expect(focus.called).to.equal(false)
            expect(blur.called).to.equal(false)
            done()
          })
        })
      });
  })

  it('should trigger key events', function(){
    var kp = sinon.spy()
      , kd = sinon.spy()
      , ku = sinon.spy()

    tsp(
      <NumberPicker
        onKeyPress={kp}
        onKeyUp={ku}
        onKeyDown={kd}
      />
    )
    .render()
    .find('input')
    .trigger('keyPress')
    .trigger('keyDown')
    .trigger('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = tsp(<ControlledNumberPicker readOnly />)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.getAttribute('aria-readonly')).to.equal('true');
  })

  it('should add correct markup when disabled', () => {
    let input = tsp(<ControlledNumberPicker disabled />)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.getAttribute('aria-disabled')).to.equal('true');
  })


  it('should allow null values with min', function(){
    let changeSpy = sinon.spy();

    tsp(
      <NumberPicker
        value={15}
        min={12}
        onChange={changeSpy}
      />
    )
    .render()
    .find('.rw-input')
    .trigger('change', { target: { value: '' } })

    expect(changeSpy.calledOnce).to.equal(true)
    expect(changeSpy.getCall(0).args[0]).to.equal(null)
  })

  it('should not trigger change at delimiter', function() {
    let changeSpy = sinon.spy();

    tsp(
      <NumberPicker
        value={1.5}
        onChange={changeSpy}
      />
    )
    .render()
    .find('.rw-input')
    .trigger('change', { target: { value: '1.' } })

    expect(changeSpy.callCount).to.equal(0)
  })

  it('should not trigger change while below min', () => {
    let changeSpy = sinon.spy();

    tsp(
      <NumberPicker
        value={1.5}
        min={12}
        onChange={changeSpy}
      />
    )
    .render()
    .find('.rw-input')
    .trigger('change', { target: { value: '11' } })
    .trigger('change', { target: { value: '111' } })

    expect(changeSpy.calledOnce).to.equal(true)
  })


  it('should change values on key down', function() {
    var change = sinon.spy();

    let instance = tsp(
      <NumberPicker
        value={10}
        onChange={change}
      />
    ).render()

    instance
      .trigger('keyDown', { key: 'End'})
      .trigger('keyDown', { key: 'Home'})
      .tap(() => {
        expect(change.called).to.equal(false)
      })
      .trigger('keyDown', { key: 'ArrowDown'})
      .tap(() => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(9)).to.equal(true)

        change.reset()
      })
      .trigger('keyDown', { key: 'ArrowUp'})
      .tap(() => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(11)).to.equal(true)
        change.reset()
      })
      .props({ min: 5, max: 15 })
      .trigger('keyDown', { key: 'End'})
      .tap(() => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(15)).to.equal(true)
        change.reset()
      })
      .trigger('keyDown', { key: 'Home'})

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(5)).to.equal(true)
  })
})
