import classNames from "classnames";
import React from "react";
import { createUseStyles } from "react-jss";

type ScanlinesProps = {
    children: any,
    className?: string
    width: number,
    crt: boolean,
    fps: number,
    color: string,
    zIndex: number,
    movingLine: boolean,
    opacity: number
}

const useStyles = createUseStyles<any, any, ScanlinesProps>(theme => ({
    scanlines: {
        position: "relative",
        overflow: "hidden", // only to animate the unique scanline
        
        "&:before, &:after": {
            display: "block",
            pointerEvents: "none",
            content: "",
            position: "absolute"
        },
    
        // unique scanline travelling on the screen
        "&:before": {
            // position: absolute;
            // bottom: 100%;
            width: "100%",
            height: `${theme.width}px`,
            zIndex: theme.zIndex + 1,
            background: theme.color,
            opacity: theme.opacity,
            animation: theme.movingLine ? "scanline 6s linear infinite" : "none",
        },
    
        // the scanlines, so!
        "&:after": {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: theme.zIndex,
            background: `linear-gradient(to bottom, transparent 50%, ${theme.color} 51%)`,
            backgroundSize: `100% ${theme.width * 2}px`,
            animation: theme.crt ? `scanlines 1s steps(${theme.fps}) infinite;` : "none"
        }
    },
    
    // ANIMATE UNIQUE SCANLINE
    "@keyframes scanline": {
        "0%": {
            transform: "translate3d(0, 200000%, 0)"
            // bottom: "0%""; // to have a continuous scanline move, use this line (here in 0% step) instead of transform and write, in &:before, { position: absolute; bottom: 100%; }
        }
    },

    "@keyframes scanlines": {
        "0%": {
            backgroundPosition: "0 50%"
            // bottom: "0%""; // to have a continuous scanline move, use this line (here in 0% step) instead of transform and write, in &:before, { position: absolute; bottom: 100%; }
        }
    }
}));

export function Scanlines({ 
    children,
    className,
    width = 5,
    crt = true,
    fps = 60,
    color = "rgba(#000, .3)",
    zIndex = 2147483648,
    opacity = .75,
    movingLine = true,
}: ScanlinesProps) {
    const styles = useStyles({ theme: {
        width,
        crt,
        fps,
        color,
        zIndex,
        opacity,
        movingLine
    } });

    return (
        <div
            className={classNames(styles.scanlines, className)}
        >
            { children }
        </div>
    );
}