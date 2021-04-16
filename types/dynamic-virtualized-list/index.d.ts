// Type definitions for http://github.com/mattermost/dynamic-virtualized-list [v1.0.0-beta]
// Project: https://github.com/mattermost/dynamic-virtualized-list
// Definitions by: naftalimurgor http://github.com/naftalimurgor
// This is a work in progress. Any kind of contribution is highly welcome.
// TypeScript version: 3.9.6

import {PureComponent, Ref, CSSProperties} from 'react';

declare module 'dynamic-virtualized-list' {

    /**
     * Arguments  passed to onScroll prop function callback as an object.
     */
    type OnScrollArgs = {
        scrollDirection: 'backward' | 'forward';
        scrollOffset: number;
        scrollUpdateWasRequested: boolean;
        clientHeight: number;
        scrollHeight: number;
    }

    /**
     * Arguments  passed to onItemsRendered prop function callback as an object.
     *
     */
    type OnItemsRenderedArgs = {

        /**
         * Index of first item in view
         */
        visibleStartIndex: number;

        /**
         * Index of the first item rendered.
         */
        overscanStartIndex?: number;

        /**
         * Index of the last item rendered.
         */
        overscanStopIndex?: number;

        /**
         * Index of the last visible item in view.
         */
        visibleStopIndex?: number;
    }
    
    /**
     * 
     * Props for DynamicSizeList component.
     */
    interface DynamicSizeListProps {

        /**
         * Height of the scroll container.
         */
        height: number;

        /**
         * Width of the scroll container.
         */
        width: number;

        /**
         *  An array of the item ids that are to be rendered.
         */
        itemData: string[];

        /**
         * No. of items to rendered below fold of view.
         */
        overscanCountForward: number;

        /**
         * No. of items to rendered above fold of view.
         */
        overscanCountBackward: number;

        /**
         * The initital scrollOffset for the list.
         */
        initialScrollOffset?: number;

        /**
         * Callback called when there are updates in scroll state in virtualized list
         * The callback has the following args passed as an object:
         *  -scrollDirection: forward or backward
         *  -scrollOffset: scroll offset from the top
         *  -scrollUpdateWasRequested: scroll update was manually requested.
         *  -clientHeight: Height of dynamic list container
         *  -scrollHeight: Height of dynamic list
         */
        onScroll: (scrollArgs: OnScrollArgs) => void;

        /**
         * Function prop that determines index of item  to scroll to.
         */
        initScrollToIndex: () => ScrollToIndex;

        /**
         * Callback called when items rendered are less than height of the scroll container.
         * This is to load more posts to fill the screen.
         */
        canLoadMorePosts: (id?: string) => void;

        /**
         * Ref of the list container which is used for determining changes for scroll containers.
         * 
         */
        innerRef: Ref<any>;

        /**
         * Styles for virtualized list.
         */
        style: CSSProperties;

        /**
         * Styles for dynamic list container.
         */
        innerListStyle: CSSProperties;

        /**
         * CSS class for styling virtual list
         */
        className: string;

        /**
         * Initial range of items to render.
         *
         */
        initRangeToRender: number[];

        /**
         * This is shown at the bottom or when a virtualized list is mounting components
         */
        loaderId: string;

        /**
         * Boolean prop used for forcing scroll correction to bottom when items height dynamically change.
         */
        correctScrollToBottom: boolean;

        /**
         * Callback called when there is a change in items rendered.
         * -The callback has the following args passed as an object.
         *  -overscanStartIndex: Index of the first item rendered.
         *  -overscanStopIndex: Index of the last item rendered.
         *  -visibleStartIndex: Index of the first item in view.
         *  -visibleStopIndex: index of the last item in view.
         */
        onItemsRendered: (args: OnItemsRenderedArgs) => void;

        /**
         *  Callback called when scroll to fails because the items are not rendered in the view before.
         */
        scrollToFailed: (index: number) => void;

    }

    /**
     * initScrollToIndex prop function return type.
     */
    type ScrollToIndex = {
        index: number;
        position: string;
        offset?: number;
    }

    export class DynamicSizeList extends PureComponent<DynamicSizeListProps> {
        /**
         * Scroll element by a given amount of pixels.
         */
        scrollBy: (scrollOffset: number, scrollBy: number) => void;

        /**
         * Scroll to a specified offset. optionally uses window.requestAnimationFrame() to schedule the scroll before
         * next repaint.
         */
        scrollTo(scrollOffset: number, scrollByValue?: number, useAnimationFrame?: boolean): void;

        /**
         * scroll to a specified item
         */
        scrollToItem(index: number, align: string, offset?: number): void;

        /**
         * Gets the range of Items to render.
         */
        _getRangeToRender(scrollTop?: number, scrollHeight?: number): number[];
    }

}
