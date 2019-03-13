<nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
            <li class="nav-item">
                <router-link to="/dashboard" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt blue"></i>
                    <p>Dashboard
                        <!-- <span class="right badge badge-danger">New</span> -->
                    </p>
                </router-link>
            </li>            
          <li class="nav-item has-treeview menu-open">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-cog green"></i>
              <p>
                Management
                <i class="right fa fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-circle-o nav-icon"></i>
                  <p>Active Page</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fas fa-circle-o nav-icon"></i>
                  <p>Inactive Page</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
                <router-link to="/users" class="nav-link">
                    <i class="nav-icon fas fa-users teal"></i>
                    <p>Users</p>
                </router-link>
            </li>
          <li class="nav-item">
                <a class="nav-link" href="{{ route('logout') }}"
                    onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                    <i class="nav-icon fas fa-power-off red"></i>
                    <p>{{ __('Logout') }}</p>
                </a>

                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            </li>
            <li class="nav-item">
                <router-link to="/profile" class="nav-link">
                    <i class="nav-icon fas fa-user orange"></i>
                    <p>Profile</p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/developer" class="nav-link">
                    <i class="nav-icon fas fa-user orange"></i>
                    <p>Developer</p>
                </router-link>
            </li>
          
        </ul>
      </nav>