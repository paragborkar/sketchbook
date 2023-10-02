import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import {COLORS} from '@/constants';
import { MENU_ITEMS } from '@/constants';
import {changeColor, changeBrushSize} from '@/slice/toolboxSlice';
import cx from 'classnames';
import { useState } from 'react';


const Toolbox = () => {
    const [brushSize, setbrushSize] = useState(1);
    const dispatch= useDispatch();
    const activeMenuItem= useSelector((state)=> state.menu.activeMenuItem);
    const {color} = useSelector((state) => state.toolbox[activeMenuItem])
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption= activeMenuItem ===MENU_ITEMS.PENCIL || activeMenuItem=== MENU_ITEMS.ERASER;
    const updateBrushSize = (e) =>{
        setbrushSize(e.target.value);
        dispatch(changeBrushSize({item: activeMenuItem,size: e.target.value}))
    }

    const updateColor = (newColor) =>{
        dispatch(changeColor({item: activeMenuItem,color: newColor}))
    }
  return (
    <div className={styles.toolboxContainer}>
        {showStrokeToolOption &&
        <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
            <div className={cx(styles.colorBox, {[styles.active]: color===COLORS.BLACK})} style={{backgroundColor:COLORS.BLACK}} onClick={() => updateColor(COLORS.BLACK)}/>
            <div className={cx(styles.colorBox, {[styles.active]: color===COLORS.RED})} style={{backgroundColor:COLORS.RED}} onClick={() => updateColor(COLORS.RED)}/>
            <div className={cx(styles.colorBox, {[styles.active]: color===COLORS.GREEN})} style={{backgroundColor:COLORS.GREEN}} onClick={() => updateColor(COLORS.GREEN)}/>
            <div className={cx(styles.colorBox, {[styles.active]: color===COLORS.BLUE})} style={{backgroundColor:COLORS.BLUE}} onClick={() => updateColor(COLORS.BLUE)}/>
            <div className={cx(styles.colorBox, {[styles.active]: color===COLORS.ORANGE})} style={{backgroundColor:COLORS.ORANGE}} onClick={() => updateColor(COLORS.ORANGE)}/>
            <div className={cx(styles.colorBox, {[styles.active]: color===COLORS.YELLOW})} style={{backgroundColor:COLORS.YELLOW}} onClick={() => updateColor(COLORS.YELLOW)}/>
        </div>
    </div>
        }

        {showBrushToolOption &&
         <div className={styles.toolItem}>
         <h4 className={styles.toolText}>Brush Size</h4>
         <div className={styles.itemContainer}>
             <input type="range" value={brushSize} min={1} max={10} step={1} onChange={updateBrushSize}/>
         </div>
     </div>
        }
    </div>
  )
}

export default Toolbox;
