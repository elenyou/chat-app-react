import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Dropdown, Image } from 'semantic-ui-react';

class UserPanel extends Component {

    state = {
        user: this.props.currentUser
    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong> </span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        },
    ]

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('signed out!'))
    }

    render() {
        const { user } = this.state;
        const { primaryColor } = this.props;

        return (
            <Grid style={{ background: primaryColor }}>
                <GridColumn>
                    <GridRow style={{ padding: '1.5em', margin: 0 }}>

                        {/* App header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="comments"></Icon>
                            <HeaderContent>Chat</HeaderContent>
                        </Header>

                        {/* User dropdown */}
                        <Header style={{ padding: '0.25em' }} as="h4" inverted>
                            <Dropdown trigger={
                                <span>
                                    <Image src={user.photoURL} spaced="right" avatar />
                                    {user.displayName}
                                </span>
                            } options={this.dropdownOptions()} >

                            </Dropdown>
                        </Header>
                    </GridRow>
                </GridColumn>
            </Grid>
        );
    }
}


export default UserPanel;