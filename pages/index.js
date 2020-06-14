
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

import { Fragment } from 'react'

const styles = {
  hero: {
    style: {
      backgroundImage: 'url("/images/sardine_light_blue.png")'
    },
    heroHead: {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    heroBody: {
      style: {
        display: 'flex',
        justifyContent: 'center'
      },
      box: {
        style: {
          border: '5px solid'
        }
      }
    }
  }
}

const Index = props => {
  return (
    <Fragment>
      <section className="hero is-fullheight" style={styles.hero.style}>
        <div className="hero-head" style={styles.hero.heroHead.style}>
          <a className="mx-4 my-5 has-text-grey-dark is-uppercase" href="#">Entrar</a>
          <a className="mx-4 my-5 has-text-grey-dark is-uppercase" href="#">Registar</a>
        </div>
        <div className="hero-body" style={styles.hero.heroBody.style}>
          <div className="box" style={styles.hero.heroBody.box.style}>
            <h1 className="title is-1 is-uppercase">Almanaque da Sardinha</h1>
            <div className="control has-icons-right">
              <input className="input" type="text" placeholder="Que estás para ai a dizer?"></input>
              <span className="icon is-small is-right">
                <Icon path={mdiMagnify} size="1.5rem" />
              </span>
            </div>
          </div>
        </div>
        <div className="hero-foot"></div>
      </section>

      <section className="section">
        TOP SARDINHAS
      </section>
    </Fragment>
  )
}

export default Index