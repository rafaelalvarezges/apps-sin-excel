import * as React from 'react';
import styles from './Nav.module.scss';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { INavProps } from './INavProps';

export default class Nav extends React.Component<INavProps>{
    constructor(props: INavProps) {
        super(props);
        this.state = {
            state: ""
        }
    }

    public render(): React.ReactElement<INavProps> {
        return (
            <div className={styles.Nav}>
                <nav className="navbar navbar-light">
                    <a className="navbar-brand" href="#">
                    <img src="./logo.png" width="200px" className="d-inline-block align-top" alt=""/>
                    </a>
                    <div className={styles.title}>
                            {this.props.title}
                            </div>
                    </nav>
            </div>
        );
    }
}
