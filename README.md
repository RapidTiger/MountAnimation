## Mount-Animation-React

* When element is unmounted, that element performs an event and then disappears.
* There are 3 conditions for an element to disappear.
    * js setTimeout : Set duration millisecond for fade out.
    * css animation : Set ref on fade-out animation element.
    * css transition : Set ref on fade-out transition element.
* There are 3 case in keys of param. The value of the key is freely available but used same structure.
    * init : If element need initial state, use init param will run open param 50 millisecond after it is run (
      NotRequired).
    * open : If init param is not exist, element mounted as open param.
    * close : When element unmount, used close param.

****

> Used CSS animation

```css
@keyframes fadeIn {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}

@keyframes fadeOut {
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
}

.fade-in {
  animation: fadeIn 0.5s forwards
}

.fade-out {
  animation: fadeOut 0.5s forwards
}
```

```tsx
const [mount, setMount] = useState(false)

const params = {
  open: {
    className: 'fade-in'
  },
  close: {
    className: 'fade-out'
  }
}

const click = (state: MountStateType) => {
  if (state === 'open') setMount(false)
}

return (
  <>
    <button onClick={() => setMount(true)}>open</button>
    <MountAnimation mount={mount} params={params}>
      {({state, ref, className}) => (
        <button ref={ref} className={className} onClick={() => click(state)}>close</button>
      )}
    </MountAnimation>
  </>
)
```

****

> Used CSS transition

```tsx
import MountAnimation, {MountStateType} from "mount-animate-react/lib/MountAnimate"
import {useState} from "react"

const App = () => {
  const [mount, setMount] = useState(false)

  const params = {
    init: {
      style: {opacity: 0}
    },
    open: {
      style: {opacity: 1}
    },
    close: {
      style: {opacity: 0}
    }
  }

  const click = (state: MountStateType) => {
    if (state === 'open') setMount(false)
  }

  return (
    <>
      <button onClick={() => setMount(true)}>open</button>
      <MountAnimation mount={mount} params={params} duration={1000}>
        {({state, ref, style}) => (
          <button ref={ref} style={{transition: '0.5s', ...style}} onClick={() => click(state)}>close</button>
        )}
      </MountAnimation>
    </>
  )
}
```

****

> Used Time duration

```tsx
import MountAnimation, {MountStateType} from "mount-animate-react/lib/MountAnimate"
import {useState} from "react"

const App = () => {
  const [mount, setMount] = useState(false)

  const params = {
    open: {
      className: 'open'
    },
    close: {
      className: 'close'
    }
  }

  const click = (state: MountStateType) => {
    if (state === 'open') setMount(false)
  }

  return (
    <>
      <button onClick={() => setMount(true)}>open</button>
      <MountAnimation mount={mount} params={params} duration={1000}>
        {({state, className}) => (
          <button className={className} onClick={() => click(state)}>close</button>
        )}
      </MountAnimation>
    </>
  )
}
```

****

> If multiple element used animation

```tsx
import MountAnimation, {MountStateType} from "mount-animate-react/lib/MountAnimate"
import {useState} from "react"

const App = () => {
  const [mount, setMount] = useState(false)

  const params = {
    init: {
      bg: {
        style: {opacity: 0}
      },
      btn: {
        style: {opacity: 0}
      },
    },
    open: {
      bg: {
        style: {opacity: 0.3}
      },
      btn: {
        style: {opacity: 1}
      },
    },
    close: {
      bg: {
        style: {opacity: 0}
      },
      btn: {
        style: {opacity: 0}
      },
    }
  }

  const click = (state: MountStateType) => {
    if (state === 'open') setMount(false)
  }

  return (
    <>
      <button onClick={() => setMount(true)}>open</button>
      <MountAnimation mount={mount} params={params}>
        {({
            state,
            ref,
            bg: {style: bgStyle},
            btn: {style: btnStyle}
          }) => {
          return (
            <>
              <div style={{
                transition: '0.5s',
                position: 'fixed',
                zIndex: 10,
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                background: 'gray',
                ...bgStyle
              }}>
              </div>
              <button ref={ref} style={{
                transition: '0.5s',
                position: 'fixed',
                zIndex: 20,
                ...btnStyle
              }} onClick={() => click(state)}>close
              </button>
            </>
          );
        }}
      </MountAnimation>
    </>
  )
}
```