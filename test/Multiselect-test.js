import React from 'react';
import tsp from 'teaspoon';

import Multiselect from '../src/Multiselect';
import MultiselectTag from '../src/MultiselectTag';
import MultiselectTagList from '../src/MultiselectTagList';

describe('Multiselect', function() {
  const ControlledMultiselect = Multiselect.ControlledComponent;

  var dataList = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function() {

    tsp(<Multiselect value={['hello']} onChange={()=>{}} />)

    tsp(<Multiselect value={['hello']} onChange={()=>{}} />)
      .render()
      .single(tsp.s`${MultiselectTag} :textContent(hello)`)
  })

  it('should respect textField and valueFields', function(){
    tsp(<Multiselect defaultValue={[0]} data={dataList} textField='label' valueField='id' />)
    tsp(<Multiselect defaultValue={[0]} data={dataList} textField='label' valueField='id' />)
      .render()
      .single(tsp.s`${MultiselectTag} :textContent(jimmy)`)
  })

  it('should start closed', () => {
    let inst = tsp(
      <ControlledMultiselect
        value={dataList.slice(0, 2)}
        data={dataList}
        textField='label'
        valueField='id'
      />
    )
    .shallowRender()

    expect(inst.props('open')).to.not.equal(true)
    expect(inst.find('Popup').props('open')).to.not.equal(true)

    inst.none('.rw-open')
    inst.single(tsp.s`MultiselectInput[aria-expanded=${false}]`)
  })

  it('should toggle add aria when open', () => {

    let inst = tsp(<ControlledMultiselect open />).shallowRender()

    expect(inst.props('open')).to.equal(true)

    inst.single('Popup[open]')
    inst.single('Widget[open]')
    inst.single('MultiselectInput[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = tsp(<ControlledMultiselect open dropUp />  )
      .shallowRender()
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should open when clicked', (done) => {
    let openSpy = sinon.spy();

    tsp(<ControlledMultiselect onToggle={openSpy} />)
      .render()
      .find('WidgetPicker')
      .trigger('click')

    setTimeout(() => {
      expect(openSpy.calledOnce).to.equal(true);
      expect(openSpy.calledWith(true)).to.equal(true);
      done()
    })
  })

  it('should not open when disabled', (done) => {
    let openSpy = sinon.spy();

    tsp(<ControlledMultiselect onToggle={openSpy} disabled />)
      .render()
      .trigger('focus')

    setTimeout(() => {
      expect(openSpy.called).to.equal(false);
      done()
    })
  })

  it('should set id on list', () =>{
    expect(
      tsp(<ControlledMultiselect open />)
        .shallowRender()
        .find('List')
        .props('id')
      ).to.be.a('string');
  })

  it('should remove tag when clicked', function(){
    var del = sinon.spy()
    tsp(
      <MultiselectTagList
        id="list"
        activeId="list_active"
        data={dataList}
        onDelete={del}
        value={dataList.slice(0, 2)}
        valueAccessor={i => i.id}
        textAccessor={i => i.label}
      />
    )
    .render()
    .tap(inst =>
      expect(inst.find(MultiselectTag).length).to.equal(2)
    )
    .first('.rw-multiselect-tag-btn')
    .trigger('click', {});

    expect(del.calledOnce).to.equal(true)
    expect(del.calledWith(dataList[0])).to.equal(true)
  })

  it('should change value when tag is clicked', function(){
    var change = sinon.spy()

    tsp(
      <Multiselect
        onChange={change}
        value={dataList.slice(0, 2)}
        data={dataList}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .first('.rw-multiselect-tag-btn')
    .trigger('click', {});

    expect(change.calledOnce).to.equal(true)
    expect(change.getCall(0).args[0]).to.eql(dataList.slice(1, 2))
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<Multiselect onBlur={blur} onFocus={focus}/>)
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

    tsp(<Multiselect disabled onBlur={blur} onFocus={focus}/>)
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
      <Multiselect
        onKeyPress={kp}
        onKeyUp={ku}
        onKeyDown={kd}
      />
    )
    .render()
    .trigger('keyPress')
    .trigger('keyDown')
    .trigger('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })


  it('should add correct markup when read-only', () => {
    let input = tsp(<ControlledMultiselect readOnly />)
      .render()
      .single('.rw-input-reset')
      .dom()

    expect(input.hasAttribute('readonly')).to.equal(true);
    expect(input.getAttribute('aria-readonly')).to.equal('true');
  })

  it('should add correct markup when disabled', () => {
    let input = tsp(<ControlledMultiselect disabled />)
      .render()
      .single('.rw-input-reset')
      .dom()

    expect(input.hasAttribute('disabled')).to.equal(true);
    expect(input.getAttribute('aria-disabled')).to.equal('true');
  })

  it('should disable only certain tags', () => {
    let change = sinon.spy()
    tsp(
      <Multiselect
        onChange={change}
        defaultValue={[0, 1]}
        data={dataList}
        disabled={[1]}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .find(MultiselectTagList)
    .single('li.rw-state-disabled button.rw-multiselect-tag-btn')
    .trigger('click')

    expect(change.called).to.equal(false)
  })

  it('should not remove tags when disabled', () => {
    let changeSpy = sinon.spy();

    tsp(
      <Multiselect
        disabled
        onChange={changeSpy}
        value={['jimmy']}
        data={dataList}
      />
    )
    .render()
    .find('.rw-multiselect-tag-btn')
    .trigger('click')

    expect(changeSpy.called).to.equal(false)
  })

  it('should not remove disabled tags', function() {
    var change = sinon.spy();
    tsp(
      <Multiselect
        onChange={change}
        defaultValue={[1, 0]}
        data={dataList}
        disabled={[1]}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .first('.rw-multiselect-tag-btn')
    .trigger('click')

    expect(change.called).to.equal(false)
  })

  it('should not remove tags when readOnly', () => {
    let changeSpy = sinon.spy();

    tsp(
      <Multiselect
        readOnly
        onChange={changeSpy}
        value={['jimmy']}
        data={dataList}
      />
    )
    .render()
    .find('.rw-multiselect-tag-btn')
    .trigger('click')

    expect(changeSpy.called).to.equal(false)
  })

  it('should call onChange with event object from select', function(){
    let change = sinon.spy()
    let value = dataList.slice(0, 1);
    tsp(
      <ControlledMultiselect
        open
        searchTerm=""
        value={value}
        data={dataList}
        onChange={change}
        onToggle={() =>{}}
      />
    )
    .shallowRender()
    .find('List')
    .trigger('select', dataList[1], 'foo')

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: value,
      dataItem: dataList[1],
      action: 'insert',
      searchTerm: ''
    })
  })

  it('should call onSearch with event object from select', function(){
    let search = sinon.spy()
    let value = dataList.slice(0, 1);
    let event = { target: { value: 'ba' } };

    tsp(
      <ControlledMultiselect
        open
        searchTerm="b"
        value={value}
        data={dataList}
        onSearch={search}
        onToggle={() =>{}}
      />
    )
    .shallowRender()
    .single('MultiselectInput')
    .trigger('change', event)

    expect(search.getCall(0).args[1]).to.eql({
      originalEvent: event,
      lastSearchTerm: 'b',
      action: 'input',
    })
  })

  it('should call Select handler', function(){
    let change = sinon.spy()
    let onSelect = sinon.spy();
    let value = dataList.slice(1);

    tsp(
      <ControlledMultiselect
        open
        onToggle={() =>{}}
        value={value}
        data={dataList}
        onChange={change}
        onSelect={onSelect}
      />
    )
    .shallowRender()
    .find('List')
      .trigger('select', dataList[1], 'foo')

    expect(onSelect.calledOnce).to.equal(true)
    expect(onSelect.getCall(0).args[1]).to.eql({ originalEvent: 'foo' })

    expect(change.calledAfter(onSelect)).to.equal(true)
  })

  it('should clear search on blur', done => {
    let onSearch = sinon.spy();

    tsp(
      <Multiselect
        data={dataList}
        onSearch={onSearch}
        defaultSearchTerm="foo"
      />
    )
    .render()
    .find('input')
    .trigger('blur')

    setTimeout(() => {
      expect(onSearch.calledOnce).to.equal(true)
      expect(onSearch.calledWith('')).to.equal(true)
      done()
    })
  })

  it('should clear searchTerm when an item is selected', () => {
    let searchSpy = sinon.spy();

    tsp(
      <Multiselect
        defaultOpen
        data={dataList}
        textField='label'
        valueField='id'
        defaultSearchTerm='ji'
        onSearch={searchSpy}
      />
    )
    .render()
    .trigger('keyDown', { keyCode: 13 })

    expect(searchSpy.calledOnce).to.equal(true)
    expect(searchSpy.calledWith('')).to.equal(true)
  })

  it('should not trigger form submission', function(){
    let spy = sinon.spy()

    tsp(
      <form
        action='/'
        onSubmit={() => {throw new Error('should not submit!')}}
      >
        <Multiselect
          searchTerm="jim"
          data={dataList}
          onSearch={()=>{}}
          onKeyDown={spy}
        />
      </form>
    )
    .render()
    .find('input')
      .trigger('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true);
  })

  it('should show create tag correctly', function(){
    var select = tsp(
      <Multiselect
        defaultOpen
        searchTerm="custom tag"
        onCreate={()=>{}}
        data={dataList}
        onSearch={()=>{}}
        textField='label'
        valueField='id'
      />
    );

    select
      .render()
      .tap(s => s
        .single('ul.rw-list-option-create')
      )
      .props('searchTerm', undefined)
      .tap(s => s
        .none('ul.rw-list-option-create')
      )
      .props('searchTerm', 'JIMMY')
      .tap(s => s
        .none('ul.rw-list-option-create')
      )
      .props({searchTerm: 'custom', onCreate: undefined })
      .tap(s => s
        .none('ul.rw-list-option-create')
      )
  })

  it('should show create tag correctly when caseSensitive', function(){
    tsp(
      <Multiselect
        defaultOpen
        searchTerm="Jimmy"
        onCreate={()=>{}}
        data={ dataList }
        onSearch={()=>{}}
        textField='label'
        valueField='id'
        caseSensitive={true}
      />
    )
    .render()
    .tap(s => s
      .single('ul.rw-list-option-create')
    )
    .props('searchTerm', 'jimmy')
    .tap(s => s
      .none('ul.rw-list-option-create')
    )
  })

  it('should call onCreate', function(){
    let create = sinon.spy()

    let assertOnCreateCalled = () => {
      expect(create.calledOnce).to.equal(true)
      expect(create.calledWith('custom tag')).to.equal(true)
      create.reset()
    };

    tsp(
      <Multiselect
        open
        searchTerm="custom tag"
        data={dataList}
        onCreate={create}
        onSearch={()=>{}}
        onToggle={()=>{}}
      />
    )
    .render()
    .find('.rw-list-option-create .rw-list-option')
      .trigger('click')
      .tap(assertOnCreateCalled)
      .end()
    .trigger('keyDown', { keyCode: 13 })
      .tap(assertOnCreateCalled)
    .trigger('keyDown', { keyCode: 13, ctrlKey: true })
      .tap(assertOnCreateCalled)
  })

  it('should navigate tags list', function(){
    let change = sinon.spy();
    let listHead = dataList.slice(0, 2);

    let inst = tsp(
      <Multiselect
        value={[0, 1, 2]}
        data={dataList}
        textField='label'
        valueField='id'
        onChange={change}
      />
    )
    .render()

    let tags = inst.find(MultiselectTagList).children();

    inst.trigger('keyDown', { key: 'ArrowLeft' })
    tags.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowRight' })
    tags.nth(1).is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Home' })
    tags.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'End' })
    tags.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Delete' })

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(listHead)).to.equal(true)
    change.reset()

    inst.trigger('keyDown', { key: 'Backspace' })

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(listHead)).to.equal(true)
  })

  it('should open on ArrowDown', () => {
    let openSpy = sinon.spy();

    tsp(
      <Multiselect
        data={dataList}
        onToggle={openSpy}
      />
    )
    .render()
    .trigger('keyDown', { key: 'ArrowDown' })

    expect(openSpy.calledOnce).to.equal(true)
    expect(openSpy.calledWith(true)).to.equal(true)
  })

  it('should navigate list', function(){
    let change = sinon.spy();

    let inst = tsp(
      <Multiselect
        defaultOpen
        data={dataList}
        textField='label'
        valueField='id'
        onChange={change}
      />
    )
    .render()

    let listItems = inst.find('List').children();

    listItems.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowDown' })
    listItems.nth(1).is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowUp' })
    listItems.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'End' })
    listItems.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Home' })
    listItems.first().is('.rw-state-focus')
  })
})
