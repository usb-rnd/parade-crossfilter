import React from 'react';
import Drawer from '../Drawer.js'
import SimpleTable from '../table/SimpleTable';
import PlotContainer from '../plots/PlotContainer';
import Images from '../images/Images';
import { DataContext } from '../crossfilter/DataContext';

import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

function CsvPage({ toLoad, screen }) {

    const mainStyle = {
        flex: '1 1 auto',
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flexDirection: 'column',
        width: '200',
        overflow: 'auto',
        background: 'rgb(240, 240, 240)',
    }

    const cellStyle = {
        border: 'solid rgb(240, 240, 240) 1px',
        background: 'white',
        borderRadius: '6px',
        padding: 15,
    }

    const [selectedIds, setSelectedIds] = React.useState([]);
    const [sortBy, setSortBy] = React.useState(undefined);
    const [sortReverse, setSortReverse] = React.useState(false);


    const layout = [
        { i: 'a', x: 0, y: 0, w: 8, h: 8, minW: 4 },
        { i: 'b', x: 10, y: 0, w: 4, h: 8, minW: 4 },
        { i: 'c', x: 0, y: 7, w: 12, h: 8 },
        { i: 'screen', x: 0, y: 5, w: 3, h: 5 }
    ];

    return (
        <DataContext toLoad={toLoad}>

            <div style={{ display: 'flex', flexWrap: 'nowrap', position: 'absolute', top: 48, height: 'calc(100% - 48px)', bottom: 0, width: '100%' }}>
                <Drawer />
                <main className="column" style={mainStyle}>

                    <ReactGridLayout
                        draggableCancel=".draggableCancel"
                        className="layout"
                        layout={layout} cols={12} rowHeight={45} >

                        {/* {screen &&
                            <div
                                key="screen"
                                style={cellStyle}>
                                <Screen
                                    screenId={screen}
                                    selectedIds={selectedIds}
                                    setSelectedIds={setSelectedIds}
                                />
                            </div>
                        } */}
                        <div
                            key="a"
                            style={cellStyle}>
                            <PlotContainer
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                            />
                        </div>
                        <div key="b" style={cellStyle}>
                            <Images
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                                sortBy={sortBy}
                                sortReverse={sortReverse}
                            />
                        </div>
                        <div key="c" style={cellStyle}>
                            <SimpleTable
                                setSelectedIds={setSelectedIds}
                                selectedIds={selectedIds}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                sortReverse={sortReverse}
                                setSortReverse={setSortReverse}
                            />
                        </div>

                    </ReactGridLayout>




                </main>
            </div>
        </DataContext>
    );
}

export default CsvPage;
