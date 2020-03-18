import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import BackgroundButton from './BackgroundButton'

export default class TagsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.makeButtons()}
      </View>
    )
  }
  
  onPress = (tag) => {
    let selected
    if (this.props.isExclusive) {
      selected = [tag]
    } else {
      selected = this.addOrRemove(this.state.selected, tag)
    }
    
    this.setState({
      selected
    })
  }
  
  makeButtons() {
    return this.props.all.map((tag, i) => {
      const on = this.state.selected.includes(tag)
      const backgroundColor = on ? '#fb5b5a' : 'white'
      const textColor = on ? 'white' : '#fb5b5a'
      const borderColor = on ? 'white' : '#fb5b5a'
      
      return (
        <BackgroundButton
          backgroundColor={backgroundColor}
          textColor={textColor}
          borderColor={borderColor}
          onPress={() => {
            this.onPress(tag)
          }}
          key={i}
          showImage={on}
          title={tag} />
      )
    })
  }

  addOrRemove = (array, item) => {
    const exists = array.includes(item)
    if (exists) {
      return array.filter((c) => { return c !== item })
    } else {
      const result = array
      result.push(item)
      return result
    }
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20
  }
})