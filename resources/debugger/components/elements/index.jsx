import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { fetchTree } from '../../redux/ducks/elements'
import ElementTreeItem from './element-tree-item'
import { Wrapper, TopBar, ButtonFilter } from '../list-element'

const mapStateToProps = state => ({
  tree: state.elements.tree,
  loading: state.elements.loading,
})

const Loading = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0 0 0 50%;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  color: #aaa;
  padding-top: 200px;
`

const Empty = styled.p`
  margin: 4rem 0 0 -12rem;
  width: 24rem;
  padding: 0 0 0 50%;
  text-align: center;
  color: #aaa;
`

const ElementTree = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow: auto;
  font-family: Consolas, Menlo, Monaco, 'Lucida Console', monospace;
  height: 100%;
`

class Elements extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTree())
  }

  render() {
    return (
      <Wrapper>
        <TopBar>
          <ButtonFilter
            onClick={() => this.props.dispatch(fetchTree())}
            title="Refresh the state"
          >
            ⟲
          </ButtonFilter>
        </TopBar>
        {this.props.loading && <Loading>Loading...</Loading>}
        {this.props.tree.length > 0 ? (
          <ElementTree>
            {this.props.tree.map((e, i) => (
              <ElementTreeItem key={i} element={e} />
            ))}
          </ElementTree>
        ) : (
          <Empty>
            No Elements found! We will keep looking, just to be sure ;)
          </Empty>
        )}
      </Wrapper>
    )
  }
}

Elements.propTypes = {
  loading: PropTypes.bool.isRequired,
  tree: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      children: PropTypes.array,
      class: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(Elements)
