import { api } from './reducer';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postTimetablesSearchSlots: build.mutation<
      PostTimetablesSearchSlotsApiResponse,
      PostTimetablesSearchSlotsApiArg
    >({
      query: (queryArg) => ({
        url: `/timetables/search-slots`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getFavorites: build.query<GetFavoritesApiResponse, GetFavoritesApiArg>({
      query: () => ({ url: `/favorites` }),
    }),
    getWorkspaceEmployeesCredentials: build.query<
      GetWorkspaceEmployeesCredentialsApiResponse,
      GetWorkspaceEmployeesCredentialsApiArg
    >({
      query: () => ({ url: `/workspace/employees/credentials` }),
    }),
    getClientAppointmentNew: build.query<
      GetClientAppointmentNewApiResponse,
      GetClientAppointmentNewApiArg
    >({
      query: (queryArg) => ({
        url: `/client/appointment/new`,
        params: {
          startDate: queryArg.startDate,
          pagination: queryArg.pagination,
          reversed: queryArg.reversed,
        },
      }),
    }),
    putWorkspace: build.mutation<PutWorkspaceApiResponse, PutWorkspaceApiArg>({
      query: (queryArg) => ({
        url: `/workspace`,
        method: 'PUT',
        body: queryArg.workspaceParametersPatch,
      }),
    }),
    postWorkspace: build.mutation<PostWorkspaceApiResponse, PostWorkspaceApiArg>({
      query: (queryArg) => ({
        url: `/workspace`,
        method: 'POST',
        body: queryArg.workspaceParametersCreate,
      }),
    }),
    deleteWorkspace: build.mutation<DeleteWorkspaceApiResponse, DeleteWorkspaceApiArg>({
      query: () => ({ url: `/workspace`, method: 'DELETE' }),
    }),
    getWorkspace: build.query<GetWorkspaceApiResponse, GetWorkspaceApiArg>({
      query: () => ({ url: `/workspace` }),
    }),
    getClientAppointmentNewComplexById: build.query<
      GetClientAppointmentNewComplexByIdApiResponse,
      GetClientAppointmentNewComplexByIdApiArg
    >({
      query: (queryArg) => ({ url: `/client/appointment/new/complex/${queryArg.id}` }),
    }),
    getSalonByIdProfile: build.query<GetSalonByIdProfileApiResponse, GetSalonByIdProfileApiArg>({
      query: (queryArg) => ({ url: `/salon/${queryArg.id}/profile` }),
    }),
    postClientAppointmentNewBySalonIdComplex: build.mutation<
      PostClientAppointmentNewBySalonIdComplexApiResponse,
      PostClientAppointmentNewBySalonIdComplexApiArg
    >({
      query: (queryArg) => ({
        url: `/client/appointment/new/${queryArg.salonId}/complex`,
        method: 'POST',
        body: queryArg.customerApiAppointmentParametersCreateComplex,
      }),
    }),
    putUsers: build.mutation<PutUsersApiResponse, PutUsersApiArg>({
      query: (queryArg) => ({ url: `/users`, method: 'PUT', body: queryArg.userParametersPatch }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` }),
    }),
    deleteUsers: build.mutation<DeleteUsersApiResponse, DeleteUsersApiArg>({
      query: () => ({ url: `/users`, method: 'DELETE' }),
    }),
    postClientAppointmentNewBySalonIdProcedure: build.mutation<
      PostClientAppointmentNewBySalonIdProcedureApiResponse,
      PostClientAppointmentNewBySalonIdProcedureApiArg
    >({
      query: (queryArg) => ({
        url: `/client/appointment/new/${queryArg.salonId}/procedure`,
        method: 'POST',
        body: queryArg.customerApiAppointmentParametersCreateProcedure,
      }),
    }),
    getSalonByIdCatalog: build.query<GetSalonByIdCatalogApiResponse, GetSalonByIdCatalogApiArg>({
      query: (queryArg) => ({ url: `/salon/${queryArg.id}/catalog` }),
    }),
    putContactsEmployeeByEmployeeIdByContactId: build.mutation<
      PutContactsEmployeeByEmployeeIdByContactIdApiResponse,
      PutContactsEmployeeByEmployeeIdByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/employee/${queryArg.employeeId}/${queryArg.contactId}`,
        method: 'PUT',
        body: queryArg.contactParametersUpdateContact,
      }),
    }),
    deleteContactsEmployeeByEmployeeIdByContactId: build.mutation<
      DeleteContactsEmployeeByEmployeeIdByContactIdApiResponse,
      DeleteContactsEmployeeByEmployeeIdByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/employee/${queryArg.employeeId}/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    getWorkspaceServicesById: build.query<
      GetWorkspaceServicesByIdApiResponse,
      GetWorkspaceServicesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/services/${queryArg.id}`,
        params: {
          salonsFilter: queryArg.salonsFilter,
          employeesFilter: queryArg.employeesFilter,
          valueFilter: queryArg.valueFilter,
          pagination: queryArg.pagination,
        },
      }),
    }),
    deleteWorkspaceServicesById: build.mutation<
      DeleteWorkspaceServicesByIdApiResponse,
      DeleteWorkspaceServicesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/services/${queryArg.id}`,
        method: 'DELETE',
        body: queryArg.serviceParametersUpdate,
      }),
    }),
    postWorkspaceAppointmentNewComplex: build.mutation<
      PostWorkspaceAppointmentNewComplexApiResponse,
      PostWorkspaceAppointmentNewComplexApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/appointment/new/complex`,
        method: 'POST',
        body: queryArg.employeeApiAppointmentParametersCreateComplex,
      }),
    }),
    putFavoritesByIdRemove: build.mutation<
      PutFavoritesByIdRemoveApiResponse,
      PutFavoritesByIdRemoveApiArg
    >({
      query: (queryArg) => ({ url: `/favorites/${queryArg.id}/remove`, method: 'PUT' }),
    }),
    postWorkspaceClients: build.mutation<
      PostWorkspaceClientsApiResponse,
      PostWorkspaceClientsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/clients`,
        method: 'POST',
        body: queryArg.clientParametersCreate,
      }),
    }),
    getWorkspaceClients: build.query<GetWorkspaceClientsApiResponse, GetWorkspaceClientsApiArg>({
      query: (queryArg) => ({
        url: `/workspace/clients`,
        params: {
          employees: queryArg.employees,
        },
      }),
    }),
    deleteContactsUserByContactId: build.mutation<
      DeleteContactsUserByContactIdApiResponse,
      DeleteContactsUserByContactIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/user/${queryArg.contactId}`, method: 'DELETE' }),
    }),
    postTimetablesByOwnerByForce: build.mutation<
      PostTimetablesByOwnerByForceApiResponse,
      PostTimetablesByOwnerByForceApiArg
    >({
      query: (queryArg) => ({
        url: `/timetables/${queryArg.owner}/${queryArg.force}`,
        method: 'POST',
        body: queryArg.timetableParametersCreatePattern,
      }),
    }),
    putWorkspacePositionsById: build.mutation<
      PutWorkspacePositionsByIdApiResponse,
      PutWorkspacePositionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/positions/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.positionParametersPatch,
      }),
    }),
    deleteWorkspacePositionsById: build.mutation<
      DeleteWorkspacePositionsByIdApiResponse,
      DeleteWorkspacePositionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/positions/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspacePositionsById: build.query<
      GetWorkspacePositionsByIdApiResponse,
      GetWorkspacePositionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/positions/${queryArg.id}` }),
    }),
    getNotifications: build.query<GetNotificationsApiResponse, GetNotificationsApiArg>({
      query: () => ({ url: `/notifications` }),
    }),
    putNotificationsReadedById: build.mutation<
      PutNotificationsReadedByIdApiResponse,
      PutNotificationsReadedByIdApiArg
    >({
      query: (queryArg) => ({ url: `/notifications/readed/${queryArg.id}`, method: 'PUT' }),
    }),
    postWorkspaceServices: build.mutation<
      PostWorkspaceServicesApiResponse,
      PostWorkspaceServicesApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/services`,
        method: 'POST',
        body: queryArg.serviceParametersCreate,
      }),
    }),
    getWorkspaceServices: build.query<GetWorkspaceServicesApiResponse, GetWorkspaceServicesApiArg>({
      query: (queryArg) => ({
        url: `/workspace/services`,
        params: {
          salonsFilter: queryArg.salonsFilter,
          employeesFilter: queryArg.employeesFilter,
          valueFilter: queryArg.valueFilter,
          pagination: queryArg.pagination,
        },
      }),
    }),
    putWorkspaceEmployeesById: build.mutation<
      PutWorkspaceEmployeesByIdApiResponse,
      PutWorkspaceEmployeesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/employees/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.employeeParametersPatch,
      }),
    }),
    getWorkspaceEmployeesById: build.query<
      GetWorkspaceEmployeesByIdApiResponse,
      GetWorkspaceEmployeesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/employees/${queryArg.id}` }),
    }),
    deleteWorkspaceEmployeesById: build.mutation<
      DeleteWorkspaceEmployeesByIdApiResponse,
      DeleteWorkspaceEmployeesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/employees/${queryArg.id}`, method: 'DELETE' }),
    }),
    postWorkspaceProcedures: build.mutation<
      PostWorkspaceProceduresApiResponse,
      PostWorkspaceProceduresApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/procedures`,
        method: 'POST',
        body: queryArg.procedureParametersCreate,
      }),
    }),
    getWorkspaceProcedures: build.query<
      GetWorkspaceProceduresApiResponse,
      GetWorkspaceProceduresApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/procedures`,
        params: {
          salonsFilter: queryArg.salonsFilter,
          employeesFilter: queryArg.employeesFilter,
          pagination: queryArg.pagination,
        },
      }),
    }),
    postContactsClientByClientId: build.mutation<
      PostContactsClientByClientIdApiResponse,
      PostContactsClientByClientIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/client/${queryArg.clientId}`,
        method: 'POST',
        body: queryArg.contactParametersCreatePrimary,
      }),
    }),
    getContactsClientByClientId: build.query<
      GetContactsClientByClientIdApiResponse,
      GetContactsClientByClientIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/client/${queryArg.clientId}` }),
    }),
    deleteWorkspaceOfftimeById: build.mutation<
      DeleteWorkspaceOfftimeByIdApiResponse,
      DeleteWorkspaceOfftimeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/offtime/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceClientsById: build.query<
      GetWorkspaceClientsByIdApiResponse,
      GetWorkspaceClientsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/clients/${queryArg.id}` }),
    }),
    getWorkspaceAppointmentNewProcedureById: build.query<
      GetWorkspaceAppointmentNewProcedureByIdApiResponse,
      GetWorkspaceAppointmentNewProcedureByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/appointment/new/procedure/${queryArg.id}` }),
    }),
    deleteWorkspaceAppointmentNewProcedureById: build.mutation<
      DeleteWorkspaceAppointmentNewProcedureByIdApiResponse,
      DeleteWorkspaceAppointmentNewProcedureByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/appointment/new/procedure/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    postAuthRefresh: build.mutation<PostAuthRefreshApiResponse, PostAuthRefreshApiArg>({
      query: (queryArg) => ({
        url: `/auth/refresh`,
        method: 'POST',
        body: queryArg.authParametersRefreshingToken,
      }),
    }),
    postWorkspaceComplex: build.mutation<
      PostWorkspaceComplexApiResponse,
      PostWorkspaceComplexApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/complex`,
        method: 'POST',
        body: queryArg.complexParametersCreate,
      }),
    }),
    getWorkspaceComplex: build.query<GetWorkspaceComplexApiResponse, GetWorkspaceComplexApiArg>({
      query: (queryArg) => ({
        url: `/workspace/complex`,
        params: {
          salonsFilter: queryArg.salonsFilter,
          employeesFilter: queryArg.employeesFilter,
          pagination: queryArg.pagination,
        },
      }),
    }),
    postAuthGoogle: build.mutation<PostAuthGoogleApiResponse, PostAuthGoogleApiArg>({
      query: (queryArg) => ({
        url: `/auth/google`,
        method: 'POST',
        body: queryArg.authParametersGoogleToken,
      }),
    }),
    getSalonByIdMasters: build.query<GetSalonByIdMastersApiResponse, GetSalonByIdMastersApiArg>({
      query: (queryArg) => ({ url: `/salon/${queryArg.id}/masters` }),
    }),
    postWorkspaceEmployeesInvite: build.mutation<
      PostWorkspaceEmployeesInviteApiResponse,
      PostWorkspaceEmployeesInviteApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/employees/invite`,
        method: 'POST',
        body: queryArg.employeeParametersInvite,
      }),
    }),
    postWorkspaceCashboxs: build.mutation<
      PostWorkspaceCashboxsApiResponse,
      PostWorkspaceCashboxsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/cashboxs`,
        method: 'POST',
        body: queryArg.cashboxParametersCreate,
      }),
    }),
    getWorkspaceCashboxs: build.query<GetWorkspaceCashboxsApiResponse, GetWorkspaceCashboxsApiArg>({
      query: (queryArg) => ({
        url: `/workspace/cashboxs`,
        params: {
          paymentType: queryArg.paymentType,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getWorkspaceById: build.query<GetWorkspaceByIdApiResponse, GetWorkspaceByIdApiArg>({
      query: (queryArg) => ({ url: `/workspace/${queryArg.id}` }),
    }),
    getWorkspaceAppointmentNewComplexById: build.query<
      GetWorkspaceAppointmentNewComplexByIdApiResponse,
      GetWorkspaceAppointmentNewComplexByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/appointment/new/complex/${queryArg.id}` }),
    }),
    deleteWorkspaceAppointmentNewComplexById: build.mutation<
      DeleteWorkspaceAppointmentNewComplexByIdApiResponse,
      DeleteWorkspaceAppointmentNewComplexByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/appointment/new/complex/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    postUploadThumb: build.mutation<PostUploadThumbApiResponse, PostUploadThumbApiArg>({
      query: (queryArg) => ({
        url: `/upload/thumb`,
        method: 'POST',
        body: queryArg.uploadRouterV1Input,
      }),
    }),
    postDevices: build.mutation<PostDevicesApiResponse, PostDevicesApiArg>({
      query: (queryArg) => ({
        url: `/devices`,
        method: 'POST',
        body: queryArg.deviceParametersSystem,
      }),
    }),
    putFavoritesByIdAdd: build.mutation<PutFavoritesByIdAddApiResponse, PutFavoritesByIdAddApiArg>({
      query: (queryArg) => ({ url: `/favorites/${queryArg.id}/add`, method: 'PUT' }),
    }),
    postWorkspaceOperation: build.mutation<
      PostWorkspaceOperationApiResponse,
      PostWorkspaceOperationApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/operation`,
        method: 'POST',
        body: queryArg.operationParametersCreate,
      }),
    }),
    getWorkspaceOperationBySalonId: build.query<
      GetWorkspaceOperationBySalonIdApiResponse,
      GetWorkspaceOperationBySalonIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/operation/${queryArg.salonId}`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
          paymentType: queryArg.paymentType,
          cashboxIds: queryArg.cashboxIds,
        },
      }),
    }),
    putContactsCustomerByContactId: build.mutation<
      PutContactsCustomerByContactIdApiResponse,
      PutContactsCustomerByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/customer/${queryArg.contactId}`,
        method: 'PUT',
        body: queryArg.contactParametersUpdateContact,
      }),
    }),
    deleteContactsCustomerByContactId: build.mutation<
      DeleteContactsCustomerByContactIdApiResponse,
      DeleteContactsCustomerByContactIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/customer/${queryArg.contactId}`, method: 'DELETE' }),
    }),
    getTestLoggerError: build.query<GetTestLoggerErrorApiResponse, GetTestLoggerErrorApiArg>({
      query: () => ({ url: `/test/loggerError` }),
    }),
    deleteWorkspaceOperationById: build.mutation<
      DeleteWorkspaceOperationByIdApiResponse,
      DeleteWorkspaceOperationByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/operation/${queryArg.id}`, method: 'DELETE' }),
    }),
    postContactsSalonBySalonId: build.mutation<
      PostContactsSalonBySalonIdApiResponse,
      PostContactsSalonBySalonIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/salon/${queryArg.salonId}`,
        method: 'POST',
        body: queryArg.contactParametersCreatePrimary,
      }),
    }),
    getContactsSalonBySalonId: build.query<
      GetContactsSalonBySalonIdApiResponse,
      GetContactsSalonBySalonIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/salon/${queryArg.salonId}` }),
    }),
    postContactsUser: build.mutation<PostContactsUserApiResponse, PostContactsUserApiArg>({
      query: (queryArg) => ({
        url: `/contacts/user`,
        method: 'POST',
        body: queryArg.contactParametersCreateRecovery,
      }),
    }),
    getContactsUser: build.query<GetContactsUserApiResponse, GetContactsUserApiArg>({
      query: () => ({ url: `/contacts/user` }),
    }),
    getTimetablesSchedules: build.query<
      GetTimetablesSchedulesApiResponse,
      GetTimetablesSchedulesApiArg
    >({
      query: (queryArg) => ({
        url: `/timetables/schedules`,
        params: {
          owners: queryArg.owners,
          period: queryArg.period,
        },
      }),
    }),
    putWorkspaceActivate: build.mutation<
      PutWorkspaceActivateApiResponse,
      PutWorkspaceActivateApiArg
    >({
      query: () => ({ url: `/workspace/activate`, method: 'PUT' }),
    }),
    getWorkspaceEmployees: build.query<
      GetWorkspaceEmployeesApiResponse,
      GetWorkspaceEmployeesApiArg
    >({
      query: () => ({ url: `/workspace/employees` }),
    }),
    postAuthTest: build.mutation<PostAuthTestApiResponse, PostAuthTestApiArg>({
      query: (queryArg) => ({
        url: `/auth/test/**`,
        method: 'POST',
        body: queryArg.authParametersAppleToken,
      }),
    }),
    getTestError: build.query<GetTestErrorApiResponse, GetTestErrorApiArg>({
      query: () => ({ url: `/test/error` }),
    }),
    postWorkspacePositions: build.mutation<
      PostWorkspacePositionsApiResponse,
      PostWorkspacePositionsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/positions`,
        method: 'POST',
        body: queryArg.positionParametersCreate,
      }),
    }),
    getWorkspacePositions: build.query<
      GetWorkspacePositionsApiResponse,
      GetWorkspacePositionsApiArg
    >({
      query: () => ({ url: `/workspace/positions` }),
    }),
    getClientAppointmentNewProcedureById: build.query<
      GetClientAppointmentNewProcedureByIdApiResponse,
      GetClientAppointmentNewProcedureByIdApiArg
    >({
      query: (queryArg) => ({ url: `/client/appointment/new/procedure/${queryArg.id}` }),
    }),
    getSearch: build.query<GetSearchApiResponse, GetSearchApiArg>({
      query: (queryArg) => ({
        url: `/search`,
        params: {
          value: queryArg.value,
          salonType: queryArg.salonType,
          latitude: queryArg.latitude,
          longitude: queryArg.longitude,
          pagination: queryArg.pagination,
        },
      }),
    }),
    postContactsCustomer: build.mutation<
      PostContactsCustomerApiResponse,
      PostContactsCustomerApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/customer`,
        method: 'POST',
        body: queryArg.contactParametersCreatePrimary,
      }),
    }),
    getContactsCustomer: build.query<GetContactsCustomerApiResponse, GetContactsCustomerApiArg>({
      query: () => ({ url: `/contacts/customer` }),
    }),
    putWorkspaceComplexById: build.mutation<
      PutWorkspaceComplexByIdApiResponse,
      PutWorkspaceComplexByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/complex/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.procedureParametersUpdate,
      }),
    }),
    deleteWorkspaceComplexById: build.mutation<
      DeleteWorkspaceComplexByIdApiResponse,
      DeleteWorkspaceComplexByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/complex/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceComplexById: build.query<
      GetWorkspaceComplexByIdApiResponse,
      GetWorkspaceComplexByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/complex/${queryArg.id}` }),
    }),
    postAuthApple: build.mutation<PostAuthAppleApiResponse, PostAuthAppleApiArg>({
      query: (queryArg) => ({
        url: `/auth/apple`,
        method: 'POST',
        body: queryArg.authParametersAppleToken,
      }),
    }),
    postContactsEmployeeByEmployeeId: build.mutation<
      PostContactsEmployeeByEmployeeIdApiResponse,
      PostContactsEmployeeByEmployeeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/employee/${queryArg.employeeId}`,
        method: 'POST',
        body: queryArg.contactParametersCreatePrimary,
      }),
    }),
    getContactsEmployeeByEmployeeId: build.query<
      GetContactsEmployeeByEmployeeIdApiResponse,
      GetContactsEmployeeByEmployeeIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/employee/${queryArg.employeeId}` }),
    }),
    getWorkspaceAssigmentsStatistic: build.query<
      GetWorkspaceAssigmentsStatisticApiResponse,
      GetWorkspaceAssigmentsStatisticApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/assigments/statistic`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
          employees: queryArg.employees,
          salons: queryArg.salons,
        },
      }),
    }),
    postHandleInviteClientByIdMerge: build.mutation<
      PostHandleInviteClientByIdMergeApiResponse,
      PostHandleInviteClientByIdMergeApiArg
    >({
      query: (queryArg) => ({
        url: `/handleInvite/client/${queryArg.id}/merge`,
        method: 'POST',
        body: queryArg.handleInviteParametersClientMerge,
      }),
    }),
    putWorkspaceProceduresById: build.mutation<
      PutWorkspaceProceduresByIdApiResponse,
      PutWorkspaceProceduresByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/procedures/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.procedureParametersUpdate,
      }),
    }),
    getWorkspaceProceduresById: build.query<
      GetWorkspaceProceduresByIdApiResponse,
      GetWorkspaceProceduresByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/procedures/${queryArg.id}` }),
    }),
    deleteWorkspaceProceduresById: build.mutation<
      DeleteWorkspaceProceduresByIdApiResponse,
      DeleteWorkspaceProceduresByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/procedures/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceAppointmentNewAllPaginated: build.query<
      GetWorkspaceAppointmentNewAllPaginatedApiResponse,
      GetWorkspaceAppointmentNewAllPaginatedApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/appointment/new/all-paginated`,
        params: {
          startDate: queryArg.startDate,
          clientId: queryArg.clientId,
          pagination: queryArg.pagination,
          reversed: queryArg.reversed,
        },
      }),
    }),
    putContactsClientByClientIdByContactId: build.mutation<
      PutContactsClientByClientIdByContactIdApiResponse,
      PutContactsClientByClientIdByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/client/${queryArg.clientId}/${queryArg.contactId}`,
        method: 'PUT',
        body: queryArg.contactParametersUpdateContact,
      }),
    }),
    deleteContactsClientByClientIdByContactId: build.mutation<
      DeleteContactsClientByClientIdByContactIdApiResponse,
      DeleteContactsClientByClientIdByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/client/${queryArg.clientId}/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    getWorkspaceAppointmentNewAllByDates: build.query<
      GetWorkspaceAppointmentNewAllByDatesApiResponse,
      GetWorkspaceAppointmentNewAllByDatesApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/appointment/new/all-by-dates`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
          clientId: queryArg.clientId,
        },
      }),
    }),
    getWorkspaceEmployeesByIdSalary: build.query<
      GetWorkspaceEmployeesByIdSalaryApiResponse,
      GetWorkspaceEmployeesByIdSalaryApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/employees/${queryArg.id}/salary`,
        params: {
          paymentType: queryArg.paymentType,
          dateTo: queryArg.dateTo,
        },
      }),
    }),
    putHandleInviteEmployeeById: build.mutation<
      PutHandleInviteEmployeeByIdApiResponse,
      PutHandleInviteEmployeeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/handleInvite/employee/${queryArg.id}`, method: 'PUT' }),
    }),
    postUsersCustomer: build.mutation<PostUsersCustomerApiResponse, PostUsersCustomerApiArg>({
      query: (queryArg) => ({
        url: `/users/customer`,
        method: 'POST',
        body: queryArg.customerParametersRegistration,
      }),
    }),
    postWorkspaceOfftimeByOwner: build.mutation<
      PostWorkspaceOfftimeByOwnerApiResponse,
      PostWorkspaceOfftimeByOwnerApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/offtime/${queryArg.owner}`,
        method: 'POST',
        body: queryArg.offtimeParametersCreate,
      }),
    }),
    getWorkspaceOfftimeByOwner: build.query<
      GetWorkspaceOfftimeByOwnerApiResponse,
      GetWorkspaceOfftimeByOwnerApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/offtime/${queryArg.owner}` }),
    }),
    putWorkspaceDeactivate: build.mutation<
      PutWorkspaceDeactivateApiResponse,
      PutWorkspaceDeactivateApiArg
    >({
      query: () => ({ url: `/workspace/deactivate`, method: 'PUT' }),
    }),
    getHandleInviteClientByIdContacts: build.query<
      GetHandleInviteClientByIdContactsApiResponse,
      GetHandleInviteClientByIdContactsApiArg
    >({
      query: (queryArg) => ({ url: `/handleInvite/client/${queryArg.id}/contacts` }),
    }),
    putContactsSalonBySalonIdByContactId: build.mutation<
      PutContactsSalonBySalonIdByContactIdApiResponse,
      PutContactsSalonBySalonIdByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/salon/${queryArg.salonId}/${queryArg.contactId}`,
        method: 'PUT',
        body: queryArg.contactParametersUpdateContact,
      }),
    }),
    deleteContactsSalonBySalonIdByContactId: build.mutation<
      DeleteContactsSalonBySalonIdByContactIdApiResponse,
      DeleteContactsSalonBySalonIdByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/salon/${queryArg.salonId}/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    postAuthLogout: build.mutation<PostAuthLogoutApiResponse, PostAuthLogoutApiArg>({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
    deleteWorkspaceCashboxsById: build.mutation<
      DeleteWorkspaceCashboxsByIdApiResponse,
      DeleteWorkspaceCashboxsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/workspace/cashboxs/${queryArg.id}`, method: 'DELETE' }),
    }),
    postWorkspaceAppointmentNewProcedure: build.mutation<
      PostWorkspaceAppointmentNewProcedureApiResponse,
      PostWorkspaceAppointmentNewProcedureApiArg
    >({
      query: (queryArg) => ({
        url: `/workspace/appointment/new/procedure`,
        method: 'POST',
        body: queryArg.employeeApiAppointmentParametersCreateProcedure,
      }),
    }),
    putNotificationsReaded: build.mutation<
      PutNotificationsReadedApiResponse,
      PutNotificationsReadedApiArg
    >({
      query: () => ({ url: `/notifications/readed`, method: 'PUT' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as _api };
export type PostTimetablesSearchSlotsApiResponse = /** status 200 OK */
  | TimetableResponsesComplexSlots
  | TimetableResponsesProcedureSlots;
export type PostTimetablesSearchSlotsApiArg = {
  body: TimetableParametersSearchSlotComplex | TimetableParametersSearchSlotProcedure;
};
export type GetFavoritesApiResponse = /** status 200 OK */ FavoriteResponsesSalon[];
export type GetFavoritesApiArg = void;
export type GetWorkspaceEmployeesCredentialsApiResponse = /** status 200 OK */ CredentialsSet;
export type GetWorkspaceEmployeesCredentialsApiArg = void;
export type GetClientAppointmentNewApiResponse =
  /** status 200 OK */ CustomerApiAppointmentResponsesAll;
export type GetClientAppointmentNewApiArg = {
  startDate: string;
  pagination: Pagination;
  reversed: boolean;
};
export type PutWorkspaceApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PutWorkspaceApiArg = {
  workspaceParametersPatch: WorkspaceParametersPatch;
};
export type PostWorkspaceApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PostWorkspaceApiArg = {
  workspaceParametersCreate: WorkspaceParametersCreate;
};
export type DeleteWorkspaceApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceApiArg = void;
export type GetWorkspaceApiResponse = /** status 200 OK */ WorkspaceResponsesPartial[];
export type GetWorkspaceApiArg = void;
export type GetClientAppointmentNewComplexByIdApiResponse =
  /** status 200 OK */ CustomerApiAppointmentResponsesComplex;
export type GetClientAppointmentNewComplexByIdApiArg = {
  id: string;
};
export type GetSalonByIdProfileApiResponse = /** status 200 OK */ SalonResponsesFull;
export type GetSalonByIdProfileApiArg = {
  id: string;
};
export type PostClientAppointmentNewBySalonIdComplexApiResponse =
  /** status 200 OK */ CustomerApiAppointmentResponsesComplex;
export type PostClientAppointmentNewBySalonIdComplexApiArg = {
  salonId: string;
  customerApiAppointmentParametersCreateComplex: CustomerApiAppointmentParametersCreateComplex;
};
export type PutUsersApiResponse = /** status 200 OK */ UserResponsesUserInfo;
export type PutUsersApiArg = {
  userParametersPatch: UserParametersPatch;
};
export type GetUsersApiResponse = /** status 200 OK */ UserResponsesUserInfo;
export type GetUsersApiArg = void;
export type DeleteUsersApiResponse = /** status 204 No Content */ number;
export type DeleteUsersApiArg = void;
export type PostClientAppointmentNewBySalonIdProcedureApiResponse =
  /** status 200 OK */ CustomerApiAppointmentResponsesProcedure;
export type PostClientAppointmentNewBySalonIdProcedureApiArg = {
  salonId: string;
  customerApiAppointmentParametersCreateProcedure: CustomerApiAppointmentParametersCreateProcedure;
};
export type GetSalonByIdCatalogApiResponse = /** status 200 OK */ CatalogResponsesCatalog;
export type GetSalonByIdCatalogApiArg = {
  id: string;
};
export type PutContactsEmployeeByEmployeeIdByContactIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PutContactsEmployeeByEmployeeIdByContactIdApiArg = {
  employeeId: string;
  contactId: string;
  contactParametersUpdateContact: ContactParametersUpdateContact;
};
export type DeleteContactsEmployeeByEmployeeIdByContactIdApiResponse =
  /** status 204 No Content */ number;
export type DeleteContactsEmployeeByEmployeeIdByContactIdApiArg = {
  employeeId: string;
  contactId: string;
};
export type GetWorkspaceServicesByIdApiResponse = /** status 200 OK */ ServiceResponsesRetrieve;
export type GetWorkspaceServicesByIdApiArg = {
  salonsFilter?: string[] | null;
  employeesFilter?: string[] | null;
  valueFilter?: string | null;
  pagination?: Pagination;
  id: string;
};
export type DeleteWorkspaceServicesByIdApiResponse = /** status 200 OK */ ServiceResponsesUpdate;
export type DeleteWorkspaceServicesByIdApiArg = {
  id: string;
  serviceParametersUpdate: ServiceParametersUpdate;
};
export type PostWorkspaceAppointmentNewComplexApiResponse =
  /** status 200 OK */ EmployeeApiAppointmentResponsesComplex;
export type PostWorkspaceAppointmentNewComplexApiArg = {
  employeeApiAppointmentParametersCreateComplex: EmployeeApiAppointmentParametersCreateComplex;
};
export type PutFavoritesByIdRemoveApiResponse = /** status 200 OK */ number;
export type PutFavoritesByIdRemoveApiArg = {
  id: string;
};
export type PostWorkspaceClientsApiResponse = /** status 200 OK */ ClientResponsesClientInfo;
export type PostWorkspaceClientsApiArg = {
  clientParametersCreate: ClientParametersCreate;
};
export type GetWorkspaceClientsApiResponse = /** status 200 OK */ ClientResponsesClientInfo[];
export type GetWorkspaceClientsApiArg = {
  employees?: string[] | null;
};
export type DeleteContactsUserByContactIdApiResponse = /** status 204 No Content */ number;
export type DeleteContactsUserByContactIdApiArg = {
  contactId: string;
};
export type PostTimetablesByOwnerByForceApiResponse = /** status 200 OK */ number;
export type PostTimetablesByOwnerByForceApiArg = {
  owner: string;
  force: string;
  timetableParametersCreatePattern: TimetableParametersCreatePattern;
};
export type PutWorkspacePositionsByIdApiResponse = /** status 200 OK */ PositionResponsesFull;
export type PutWorkspacePositionsByIdApiArg = {
  id: string;
  positionParametersPatch: PositionParametersPatch;
};
export type DeleteWorkspacePositionsByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspacePositionsByIdApiArg = {
  id: string;
};
export type GetWorkspacePositionsByIdApiResponse = /** status 200 OK */ PositionResponsesFull;
export type GetWorkspacePositionsByIdApiArg = {
  id: string;
};
export type GetNotificationsApiResponse = /** status 200 OK */ NoticeResponsesFull[];
export type GetNotificationsApiArg = void;
export type PutNotificationsReadedByIdApiResponse = /** status 200 OK */ number;
export type PutNotificationsReadedByIdApiArg = {
  id: string;
};
export type PostWorkspaceServicesApiResponse = /** status 200 OK */ ServiceResponsesCreate;
export type PostWorkspaceServicesApiArg = {
  serviceParametersCreate: ServiceParametersCreate;
};
export type GetWorkspaceServicesApiResponse = /** status 200 OK */ ServiceResponsesAll;
export type GetWorkspaceServicesApiArg = {
  salonsFilter?: string[] | null;
  employeesFilter?: string[] | null;
  valueFilter?: string | null;
  pagination?: Pagination;
};
export type PutWorkspaceEmployeesByIdApiResponse = /** status 200 OK */ EmployeeResponsesFull;
export type PutWorkspaceEmployeesByIdApiArg = {
  id: string;
  employeeParametersPatch: EmployeeParametersPatch;
};
export type GetWorkspaceEmployeesByIdApiResponse = /** status 200 OK */ EmployeeResponsesFull;
export type GetWorkspaceEmployeesByIdApiArg = {
  id: string;
};
export type DeleteWorkspaceEmployeesByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceEmployeesByIdApiArg = {
  id: string;
};
export type PostWorkspaceProceduresApiResponse = /** status 200 OK */ ProcedureResponsesCreate;
export type PostWorkspaceProceduresApiArg = {
  procedureParametersCreate: ProcedureParametersCreate;
};
export type GetWorkspaceProceduresApiResponse = /** status 200 OK */ ProcedureResponsesAll;
export type GetWorkspaceProceduresApiArg = {
  salonsFilter?: string[] | null;
  employeesFilter?: string[] | null;
  pagination?: Pagination;
};
export type PostContactsClientByClientIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PostContactsClientByClientIdApiArg = {
  clientId: string;
  contactParametersCreatePrimary: ContactParametersCreatePrimary;
};
export type GetContactsClientByClientIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact[];
export type GetContactsClientByClientIdApiArg = {
  clientId: string;
};
export type DeleteWorkspaceOfftimeByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceOfftimeByIdApiArg = {
  id: string;
};
export type GetWorkspaceClientsByIdApiResponse = /** status 200 OK */ ClientResponsesClientInfo;
export type GetWorkspaceClientsByIdApiArg = {
  id: string;
};
export type GetWorkspaceAppointmentNewProcedureByIdApiResponse =
  /** status 200 OK */ EmployeeApiAppointmentResponsesProcedure;
export type GetWorkspaceAppointmentNewProcedureByIdApiArg = {
  id: string;
};
export type DeleteWorkspaceAppointmentNewProcedureByIdApiResponse = unknown;
export type DeleteWorkspaceAppointmentNewProcedureByIdApiArg = {
  id: string;
};
export type PostAuthRefreshApiResponse = /** status 200 OK */ AuthResponsesRefresh;
export type PostAuthRefreshApiArg = {
  authParametersRefreshingToken: AuthParametersRefreshingToken;
};
export type PostWorkspaceComplexApiResponse = /** status 200 OK */ ComplexResponsesCreate;
export type PostWorkspaceComplexApiArg = {
  complexParametersCreate: ComplexParametersCreate;
};
export type GetWorkspaceComplexApiResponse = /** status 200 OK */ ComplexResponsesAll;
export type GetWorkspaceComplexApiArg = {
  salonsFilter?: string[] | null;
  employeesFilter?: string[] | null;
  pagination?: Pagination;
};
export type PostAuthGoogleApiResponse = /** status 200 OK */ AuthResponsesSuccessAuth;
export type PostAuthGoogleApiArg = {
  authParametersGoogleToken: AuthParametersGoogleToken;
};
export type GetSalonByIdMastersApiResponse = /** status 200 OK */ MasterResponsesMaster[];
export type GetSalonByIdMastersApiArg = {
  id: string;
};
export type PostWorkspaceEmployeesInviteApiResponse = /** status 200 OK */ EmployeeResponsesFull;
export type PostWorkspaceEmployeesInviteApiArg = {
  employeeParametersInvite: EmployeeParametersInvite;
};
export type PostWorkspaceCashboxsApiResponse = /** status 200 OK */ CashboxResponsesFull;
export type PostWorkspaceCashboxsApiArg = {
  cashboxParametersCreate: CashboxParametersCreate;
};
export type GetWorkspaceCashboxsApiResponse = /** status 200 OK */ CashboxResponsesFull[];
export type GetWorkspaceCashboxsApiArg = {
  paymentType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};
export type GetWorkspaceByIdApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type GetWorkspaceByIdApiArg = {
  id: string;
};
export type GetWorkspaceAppointmentNewComplexByIdApiResponse =
  /** status 200 OK */ EmployeeApiAppointmentResponsesComplex;
export type GetWorkspaceAppointmentNewComplexByIdApiArg = {
  id: string;
};
export type DeleteWorkspaceAppointmentNewComplexByIdApiResponse = unknown;
export type DeleteWorkspaceAppointmentNewComplexByIdApiArg = {
  id: string;
};
export type PostUploadThumbApiResponse = /** status 200 OK */ string;
export type PostUploadThumbApiArg = {
  uploadRouterV1Input: UploadRouterV1Input;
};
export type PostDevicesApiResponse = /** status 200 OK */ DeviceResponsesFull;
export type PostDevicesApiArg = {
  deviceParametersSystem: DeviceParametersSystem;
};
export type PutFavoritesByIdAddApiResponse = /** status 200 OK */ number;
export type PutFavoritesByIdAddApiArg = {
  id: string;
};
export type PostWorkspaceOperationApiResponse = /** status 200 OK */ OperationResponsesFull;
export type PostWorkspaceOperationApiArg = {
  operationParametersCreate: OperationParametersCreate;
};
export type GetWorkspaceOperationBySalonIdApiResponse =
  /** status 200 OK */ OperationResponsesFull[];
export type GetWorkspaceOperationBySalonIdApiArg = {
  startDate?: string | null;
  endDate?: string | null;
  paymentType?: string | null;
  cashboxIds?: string[] | null;
  salonId: string;
};
export type PutContactsCustomerByContactIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PutContactsCustomerByContactIdApiArg = {
  contactId: string;
  contactParametersUpdateContact: ContactParametersUpdateContact;
};
export type DeleteContactsCustomerByContactIdApiResponse = /** status 204 No Content */ number;
export type DeleteContactsCustomerByContactIdApiArg = {
  contactId: string;
};
export type GetTestLoggerErrorApiResponse = unknown;
export type GetTestLoggerErrorApiArg = void;
export type DeleteWorkspaceOperationByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceOperationByIdApiArg = {
  id: string;
};
export type PostContactsSalonBySalonIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PostContactsSalonBySalonIdApiArg = {
  salonId: string;
  contactParametersCreatePrimary: ContactParametersCreatePrimary;
};
export type GetContactsSalonBySalonIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact[];
export type GetContactsSalonBySalonIdApiArg = {
  salonId: string;
};
export type PostContactsUserApiResponse = /** status 200 OK */ ContactSharedRecoveryContact;
export type PostContactsUserApiArg = {
  contactParametersCreateRecovery: ContactParametersCreateRecovery;
};
export type GetContactsUserApiResponse = /** status 200 OK */ ContactSharedRecoveryContact[];
export type GetContactsUserApiArg = void;
export type GetTimetablesSchedulesApiResponse = /** status 200 OK */ TimetableResponsesSchedule[];
export type GetTimetablesSchedulesApiArg = {
  owners: string[];
  period: SafeDateInterval;
};
export type PutWorkspaceActivateApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PutWorkspaceActivateApiArg = void;
export type GetWorkspaceEmployeesApiResponse = /** status 200 OK */ EmployeeResponsesPartial[];
export type GetWorkspaceEmployeesApiArg = void;
export type PostAuthTestApiResponse = /** status 200 OK */ AuthResponsesSuccessAuth;
export type PostAuthTestApiArg = {
  authParametersAppleToken: AuthParametersAppleToken;
};
export type GetTestErrorApiResponse = unknown;
export type GetTestErrorApiArg = void;
export type PostWorkspacePositionsApiResponse = /** status 200 OK */ PositionResponsesFull;
export type PostWorkspacePositionsApiArg = {
  positionParametersCreate: PositionParametersCreate;
};
export type GetWorkspacePositionsApiResponse = /** status 200 OK */ PositionResponsesFull[];
export type GetWorkspacePositionsApiArg = void;
export type GetClientAppointmentNewProcedureByIdApiResponse =
  /** status 200 OK */ CustomerApiAppointmentResponsesProcedure;
export type GetClientAppointmentNewProcedureByIdApiArg = {
  id: string;
};
export type GetSearchApiResponse = /** status 200 OK */ SearchResponsesFull;
export type GetSearchApiArg = {
  value?: string | null;
  salonType?: SalonType;
  latitude?: number | null;
  longitude?: number | null;
  pagination?: Pagination;
};
export type PostContactsCustomerApiResponse = /** status 200 OK */ ContactSharedPrimaryContact;
export type PostContactsCustomerApiArg = {
  contactParametersCreatePrimary: ContactParametersCreatePrimary;
};
export type GetContactsCustomerApiResponse = /** status 200 OK */ ContactSharedPrimaryContact[];
export type GetContactsCustomerApiArg = void;
export type PutWorkspaceComplexByIdApiResponse = /** status 200 OK */ ProcedureResponsesUpdate;
export type PutWorkspaceComplexByIdApiArg = {
  id: string;
  procedureParametersUpdate: ProcedureParametersUpdate;
};
export type DeleteWorkspaceComplexByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceComplexByIdApiArg = {
  id: string;
};
export type GetWorkspaceComplexByIdApiResponse = /** status 200 OK */ ComplexResponsesRetrieve;
export type GetWorkspaceComplexByIdApiArg = {
  id: string;
};
export type PostAuthAppleApiResponse = /** status 200 OK */ AuthResponsesSuccessAuth;
export type PostAuthAppleApiArg = {
  authParametersAppleToken: AuthParametersAppleToken;
};
export type PostContactsEmployeeByEmployeeIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PostContactsEmployeeByEmployeeIdApiArg = {
  employeeId: string;
  contactParametersCreatePrimary: ContactParametersCreatePrimary;
};
export type GetContactsEmployeeByEmployeeIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact[];
export type GetContactsEmployeeByEmployeeIdApiArg = {
  employeeId: string;
};
export type GetWorkspaceAssigmentsStatisticApiResponse =
  /** status 200 OK */ StatisticResponsesAppointments;
export type GetWorkspaceAssigmentsStatisticApiArg = {
  startDate: string;
  endDate: string;
  employees?: string[] | null;
  salons?: string[] | null;
};
export type PostHandleInviteClientByIdMergeApiResponse =
  /** status 200 OK */ HandleInviteResponsesClientMergeSuccess;
export type PostHandleInviteClientByIdMergeApiArg = {
  id: string;
  handleInviteParametersClientMerge: HandleInviteParametersClientMerge;
};
export type PutWorkspaceProceduresByIdApiResponse = /** status 200 OK */ ProcedureResponsesUpdate;
export type PutWorkspaceProceduresByIdApiArg = {
  id: string;
  procedureParametersUpdate: ProcedureParametersUpdate;
};
export type GetWorkspaceProceduresByIdApiResponse = /** status 200 OK */ ProcedureResponsesRetrieve;
export type GetWorkspaceProceduresByIdApiArg = {
  id: string;
};
export type DeleteWorkspaceProceduresByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceProceduresByIdApiArg = {
  id: string;
};
export type GetWorkspaceAppointmentNewAllPaginatedApiResponse =
  /** status 200 OK */ EmployeeApiAppointmentResponsesAll;
export type GetWorkspaceAppointmentNewAllPaginatedApiArg = {
  startDate: string;
  clientId?: string | null;
  pagination: Pagination;
  reversed: boolean;
};
export type PutContactsClientByClientIdByContactIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PutContactsClientByClientIdByContactIdApiArg = {
  clientId: string;
  contactId: string;
  contactParametersUpdateContact: ContactParametersUpdateContact;
};
export type DeleteContactsClientByClientIdByContactIdApiResponse =
  /** status 204 No Content */ number;
export type DeleteContactsClientByClientIdByContactIdApiArg = {
  clientId: string;
  contactId: string;
};
export type GetWorkspaceAppointmentNewAllByDatesApiResponse =
  /** status 200 OK */ EmployeeApiAppointmentResponsesAll;
export type GetWorkspaceAppointmentNewAllByDatesApiArg = {
  startDate: string;
  endDate: string;
  clientId?: string | null;
};
export type GetWorkspaceEmployeesByIdSalaryApiResponse =
  /** status 200 OK */ SalaryResponsesBalanceFull;
export type GetWorkspaceEmployeesByIdSalaryApiArg = {
  paymentType: string;
  dateTo: string;
  id: string;
};
export type PutHandleInviteEmployeeByIdApiResponse =
  /** status 200 OK */ HandleInviteResponsesEmployeeSuccess;
export type PutHandleInviteEmployeeByIdApiArg = {
  id: string;
};
export type PostUsersCustomerApiResponse = /** status 200 OK */ CustomerResponsesRegistration;
export type PostUsersCustomerApiArg = {
  customerParametersRegistration: CustomerParametersRegistration;
};
export type PostWorkspaceOfftimeByOwnerApiResponse = /** status 200 OK */ OfftimeResponsesFull;
export type PostWorkspaceOfftimeByOwnerApiArg = {
  owner: string;
  offtimeParametersCreate: OfftimeParametersCreate;
};
export type GetWorkspaceOfftimeByOwnerApiResponse = /** status 200 OK */ OfftimeResponsesFull[];
export type GetWorkspaceOfftimeByOwnerApiArg = {
  owner: string;
};
export type PutWorkspaceDeactivateApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PutWorkspaceDeactivateApiArg = void;
export type GetHandleInviteClientByIdContactsApiResponse =
  /** status 200 OK */ HandleInviteResponsesMaskedContacts;
export type GetHandleInviteClientByIdContactsApiArg = {
  id: string;
};
export type PutContactsSalonBySalonIdByContactIdApiResponse =
  /** status 200 OK */ ContactSharedPrimaryContact;
export type PutContactsSalonBySalonIdByContactIdApiArg = {
  salonId: string;
  contactId: string;
  contactParametersUpdateContact: ContactParametersUpdateContact;
};
export type DeleteContactsSalonBySalonIdByContactIdApiResponse =
  /** status 204 No Content */ number;
export type DeleteContactsSalonBySalonIdByContactIdApiArg = {
  salonId: string;
  contactId: string;
};
export type PostAuthLogoutApiResponse = /** status 204 No Content */ number;
export type PostAuthLogoutApiArg = void;
export type DeleteWorkspaceCashboxsByIdApiResponse = /** status 204 No Content */ number;
export type DeleteWorkspaceCashboxsByIdApiArg = {
  id: string;
};
export type PostWorkspaceAppointmentNewProcedureApiResponse =
  /** status 200 OK */ EmployeeApiAppointmentResponsesProcedure;
export type PostWorkspaceAppointmentNewProcedureApiArg = {
  employeeApiAppointmentParametersCreateProcedure: EmployeeApiAppointmentParametersCreateProcedure;
};
export type PutNotificationsReadedApiResponse = /** status 200 OK */ number;
export type PutNotificationsReadedApiArg = void;
export type SafeDateInterval = {
  end: string;
  start: string;
};
export type TimetableResponsesComplexSlotsSlotChunk = {
  id: string;
  time: SafeDateInterval;
  procedureId: string;
};
export type TimetableResponsesComplexSlotsSlot = {
  chunks: TimetableResponsesComplexSlotsSlotChunk[];
  total: SafeDateInterval;
};
export type TimetableResponsesComplexSlots = {
  timeZoneId: string;
  slots: TimetableResponsesComplexSlotsSlot[];
};
export type TimetableResponsesProcedureSlots = {
  intervals: SafeDateInterval[];
  timeZoneId: string;
};
export type TimetableParametersSearchSlotComplex = {
  chunks: string[];
  id: string;
};
export type TimetableParametersSearchSlotProcedure = {
  id: string;
};
export type SalonType = 'individual' | 'chain' | 'master';
export type CoordinatePoint = {
  longitude: number;
  latitude: number;
};
export type Address = {
  address: string;
  city: string;
  country: string;
};
export type FavoriteResponsesSalon = {
  type: SalonType;
  id: string;
  logo: string;
  point: CoordinatePoint;
  isActive: boolean;
  address: Address;
  name: string;
};
export type CredentialsSet = {
  salaryCreds: string[];
  employeeCreds: string[];
  appointmentCreds: string[];
  salonCreds: string[];
  clientCreds: string[];
  statisticCreds: string[];
  notifyCreds: string[];
  procedureCreds: string[];
  positionCreds: string[];
  financeCreds: string[];
  worktimeCreds: string[];
};
export type ContactType = 'phone' | 'email' | 'telegram' | 'instagram';
export type PhoneTypes = 'whatsapp' | 'message' | 'call';
export type ContactSharedPrimaryContact = {
  value: string;
  type: ContactType;
  phoneTypes?: PhoneTypes[] | null;
  id: string;
};
export type CustomerApiAppointmentResponsesComplexProcedure = {
  title: string;
  employeeId: string;
  employeeAvatar: string;
  id: string;
  employeeName: string;
  time: SafeDateInterval;
  employeeContacts: ContactSharedPrimaryContact[];
};
export type CustomerApiAppointmentResponsesComplex = {
  address: Address;
  point: CoordinatePoint;
  procedures: CustomerApiAppointmentResponsesComplexProcedure[];
  id: string;
  alias?: string | null;
  salonId: string;
  price: number;
  currency: string;
  salonLogo: string;
};
export type CustomerApiAppointmentResponsesProcedure = {
  employeeAvatar: string;
  employeeName: string;
  time: SafeDateInterval;
  employeeId: string;
  salonId: string;
  currency: string;
  title: string;
  price: number;
  point: CoordinatePoint;
  employeeContacts: ContactSharedPrimaryContact[];
  address: Address;
  procedureId: string;
  id: string;
  salonLogo: string;
};
export type CustomerApiAppointmentResponsesAll = {
  complexes: CustomerApiAppointmentResponsesComplex[];
  procedures: CustomerApiAppointmentResponsesProcedure[];
};
export type Pagination = {
  page: number;
  per: number;
};
export type Token = {
  value: string;
  expiration: string;
};
export type WorkspaceResponsesFull = {
  id: string;
  logo: string;
  timeZoneId: string;
  type: SalonType;
  localeId: string;
  isActive: boolean;
  name: string;
  point: CoordinatePoint;
  address: Address;
  description?: string | null;
  employeeToken: Token;
};
export type WorkspaceParametersPatch = {
  logo?: string | null;
  type?: SalonType;
  name?: string | null;
  description?: string | null;
};
export type WorkspaceInternalContact = {
  type: ContactType;
  value: string;
};
export type ScheduleDay = {
  workTime: string;
  offTime: string[];
};
export type ScheduleWeek = {
  sunday?: ScheduleDay;
  tuesday?: ScheduleDay;
  thursday?: ScheduleDay;
  friday?: ScheduleDay;
  saturday?: ScheduleDay;
  monday?: ScheduleDay;
  wednesday?: ScheduleDay;
};
export type SchedulePattern = {
  weekly: ScheduleWeek;
};
export type TimetableParametersCreatePattern = {
  endAt?: string | null;
  startAt: string;
  schedule: SchedulePattern;
};
export type WorkspaceParametersCreate = {
  timeZoneId: string;
  contact?: WorkspaceInternalContact;
  logo?: string | null;
  timetable?: TimetableParametersCreatePattern;
  description?: string | null;
  type: SalonType;
  point: CoordinatePoint;
  name: string;
  localeId: string;
  address: Address;
};
export type WorkspaceResponsesPartial = {
  name: string;
  logo: string;
  point: CoordinatePoint;
  address: Address;
  id: string;
  type: SalonType;
};
export type SalonResponsesFull = {
  name: string;
  isFavorite: boolean;
  id: string;
  point: CoordinatePoint;
  localeId: string;
  address: Address;
  logo: string;
  isActive: boolean;
  description?: string | null;
  type: SalonType;
  timeZoneId: string;
};
export type CustomerApiAppointmentParametersCreateComplexChunk = {
  id: string;
  procedureId: string;
  time: SafeDateInterval;
};
export type CustomerApiAppointmentParametersCreateComplex = {
  chunks: CustomerApiAppointmentParametersCreateComplexChunk[];
  complexId: string;
};
export type UserResponsesUserInfo = {
  nickname: string;
  avatar: string;
  haveCustomer: boolean;
  id: string;
  haveEmployee: boolean;
};
export type UserParametersPatch = {
  avatar?: string | null;
  nickname?: string | null;
};
export type CustomerApiAppointmentParametersCreateProcedure = {
  time: SafeDateInterval;
  procedureId: string;
};
export type ComplexHelpersPriceShift = {
  percent: number;
};
export type ServiceTags =
  | 'barbershop'
  | 'nails'
  | 'massage'
  | 'spa'
  | 'cosmetology'
  | 'hairdressing'
  | 'epilation'
  | 'permanent makeup'
  | 'piercing'
  | 'makeup'
  | 'brows'
  | 'lashes';
export type TranslatedServiceTag = {
  translate: string;
  tag: ServiceTags;
};
export type Price = {
  amount: number;
  currency: string;
};
export type ComplexHelpersProcedureResponse = {
  masterId: string;
  masterNickname: string;
  masterAvatar: string;
  alias?: string | null;
  description?: string | null;
  price: Price;
  id: string;
  duration: number;
};
export type ComplexHelpersChunkResponse = {
  id: string;
  serviceTags: TranslatedServiceTag[];
  order: number;
  serviceId: string;
  procedures: ComplexHelpersProcedureResponse[];
  serviceTitle: string;
};
export type ComplexHelpersComplexResponse = {
  description?: string | null;
  priceShift: ComplexHelpersPriceShift;
  alias?: string | null;
  chunks: ComplexHelpersChunkResponse[];
  id: string;
};
export type ServiceHelpersServiceResponse = {
  title: string;
  tags: TranslatedServiceTag[];
  id: string;
};
export type ProcedureHelpersCaseDuration = {
  fixedValue: number;
};
export type ProcedureHelpersCasePrice = {
  fixedValue: number;
};
export type ProcedureHelpersCaseResponse = {
  title: string;
  duration?: ProcedureHelpersCaseDuration;
  id: number;
  price?: ProcedureHelpersCasePrice;
};
export type ProcedureHelpersParameterResponse = {
  id: string;
  optional: boolean;
  cases: ProcedureHelpersCaseResponse[];
  title: string;
};
export type ProcedureHelpersAllProcedureResponse = {
  description?: string | null;
  masterAvatar: string;
  alias?: string | null;
  serviceTags: TranslatedServiceTag[];
  duration: number;
  id: string;
  masterNickname: string;
  serviceId: string;
  parameters: ProcedureHelpersParameterResponse[];
  serviceTitle: string;
  masterId: string;
  price: Price;
};
export type CatalogResponsesCatalog = {
  complexes: ComplexHelpersComplexResponse[];
  services: ServiceHelpersServiceResponse[];
  procedures: ProcedureHelpersAllProcedureResponse[];
};
export type ContactParametersUpdateContact = {
  phoneTypes?: PhoneTypes[] | null;
};
export type ServiceHelpersCase = {
  title: string;
  id: number;
};
export type ServiceHelpersParameter = {
  id: string;
  title: string;
  cases: ServiceHelpersCase[];
};
export type ServiceResponsesRetrieve = {
  id: string;
  parameters: ServiceHelpersParameter[];
  title: string;
  tags: TranslatedServiceTag[];
};
export type ServiceResponsesUpdate = {
  id: string;
  title: string;
  tags: TranslatedServiceTag[];
};
export type ServiceParametersUpdate = {
  title?: string | null;
  tags?: ServiceTags[] | null;
};
export type EmployeeApiAppointmentResponsesComplexProcedure = {
  id: string;
  title: string;
  employeeId: string;
  employeeContacts: ContactSharedPrimaryContact[];
  employeeName: string;
  time: SafeDateInterval;
  employeeAvatar: string;
};
export type EmployeeApiAppointmentResponsesComplex = {
  clientName: string;
  price: number;
  clientAvatar: string;
  id: string;
  point: CoordinatePoint;
  salonId: string;
  clientContacts: ContactSharedPrimaryContact[];
  clientId: string;
  salonLogo: string;
  address: Address;
  currency: string;
  procedures: EmployeeApiAppointmentResponsesComplexProcedure[];
  alias?: string | null;
};
export type EmployeeApiAppointmentParametersCreateComplexChunk = {
  procedureId: string;
  id: string;
  time: SafeDateInterval;
};
export type EmployeeApiAppointmentParametersCreateComplex = {
  complexId: string;
  chunks: EmployeeApiAppointmentParametersCreateComplexChunk[];
  clientId: string;
};
export type ClientInternalUserInfo = {
  avatar: string;
  nickname: string;
};
export type ClientResponsesClientInfo = {
  id: string;
  user?: ClientInternalUserInfo;
  alias?: string | null;
  contacts: ContactSharedPrimaryContact[];
};
export type ClientInternalContact = {
  value: string;
  type: ContactType;
};
export type ClientParametersCreate = {
  alias: string;
  contact?: ClientInternalContact;
};
export type Wage = {
  price: Price;
  period: string;
};
export type SalaryPaymentType = {
  percent: number;
};
export type SalaryResponsesHelpersService = {
  title: string;
  category: ServiceTags[];
  description: string;
  id: string;
};
export type SalaryResponsesHelpersServiceWithPaymentType = {
  paymentType: SalaryPaymentType;
  service: SalaryResponsesHelpersService;
};
export type SalaryResponsesRulesFull = {
  wage?: Wage;
  grid?: SalaryResponsesHelpersServiceWithPaymentType[] | null;
  percent?: number | null;
};
export type PositionResponsesFull = {
  id: string;
  salary: SalaryResponsesRulesFull;
  title: string;
  owner: boolean;
  creds: CredentialsSet;
};
export type SalaryParametersRulesCreate = {
  grid?: SalaryPaymentType[] | null;
  percent?: number | null;
  wage?: Wage;
};
export type PositionParametersPatch = {
  title?: string | null;
  salary?: SalaryParametersRulesCreate;
  makeOwner?: boolean | null;
  creds?: CredentialsSet;
};
export type NoticeResponsesFull = {
  category: string;
  id: string;
  parameters?: string | null;
  isRead: boolean;
  date?: string | null;
  messageKey: string;
  titleKey: string;
};
export type ServiceResponsesCreate = {
  id: string;
  tags: TranslatedServiceTag[];
  title: string;
};
export type ServiceParametersCreate = {
  title: string;
  tags: ServiceTags[];
};
export type ServiceResponsesAll = {
  services: ServiceHelpersServiceResponse[];
};
export type EmployeeInternalUserInfo = {
  nickname: string;
  avatar: string;
  id: string;
};
export type EmployeeResponsesFull = {
  id: string;
  user?: EmployeeInternalUserInfo;
  position: PositionResponsesFull;
  contacts: ContactSharedPrimaryContact[];
  salonId: string;
};
export type EmployeeParametersPatch = {
  positionId?: string | null;
};
export type ProcedureHelpersCreateProcedureResponse = {
  masterId: string;
  serviceId: string;
  duration: number;
  serviceTitle: string;
  price: Price;
  id: string;
  description?: string | null;
  masterNickname: string;
  parameters: ProcedureHelpersParameterResponse[];
  serviceTags: TranslatedServiceTag[];
  masterAvatar: string;
  alias?: string | null;
};
export type ProcedureResponsesCreate = {
  procedures: ProcedureHelpersCreateProcedureResponse[];
};
export type ProcedureHelpersCreateCaseRequest = {
  casePrice?: ProcedureHelpersCasePrice;
  caseDuration?: ProcedureHelpersCaseDuration;
  id: number;
};
export type ProcedureHelpersCreateParameterRequest = {
  optional: boolean;
  id: string;
  cases: ProcedureHelpersCreateCaseRequest[];
};
export type ProcedureParametersCreate = {
  serviceId: string;
  duration: number;
  price: Price;
  parameters: ProcedureHelpersCreateParameterRequest[];
  description?: string | null;
  employeeIds: string[];
  alias?: string | null;
};
export type ProcedureResponsesAll = {
  procedures: ProcedureHelpersAllProcedureResponse[];
};
export type ContactParametersCreatePrimary = {
  phoneTypes?: PhoneTypes[] | null;
  type: ContactType;
  value: string;
};
export type EmployeeApiAppointmentResponsesProcedure = {
  employeeId: string;
  clientName: string;
  price: number;
  clientContacts: ContactSharedPrimaryContact[];
  employeeContacts: ContactSharedPrimaryContact[];
  id: string;
  clientAvatar: string;
  point: CoordinatePoint;
  procedureId: string;
  employeeAvatar: string;
  clientId: string;
  currency: string;
  time: SafeDateInterval;
  salonId: string;
  title: string;
  address: Address;
  salonLogo: string;
  employeeName: string;
};
export type AuthResponsesRefresh = {
  refreshToken?: Token;
  accessToken: Token;
};
export type AuthParametersRefreshingToken = {
  token: string;
};
export type ComplexResponsesCreate = {
  description?: string | null;
  priceShift: ComplexHelpersPriceShift;
  chunks: ComplexHelpersChunkResponse[];
  id: string;
  alias?: string | null;
};
export type ComplexHelpersCreateChunkRequest = {
  order: number;
  proceduresIds: string[];
};
export type ComplexParametersCreate = {
  description?: string | null;
  alias?: string | null;
  chunks: ComplexHelpersCreateChunkRequest[];
  priceShift: ComplexHelpersPriceShift;
};
export type ComplexResponsesAll = {
  complexes: ComplexHelpersComplexResponse[];
};
export type AuthInternalUserInfo = {
  id: string;
  haveContact: boolean;
  haveEmployee: boolean;
  haveCustomer: boolean;
  avatar?: string | null;
  nickname?: string | null;
};
export type AuthResponsesSuccessAuth = {
  refreshToken: Token;
  user: AuthInternalUserInfo;
  accessToken: Token;
};
export type AuthParametersGoogleToken = {
  firstName?: string | null;
  token: string;
  lastName?: string | null;
};
export type MasterResponsesMaster = {
  position: string;
  nickName: string;
  id: string;
  logo: string;
};
export type EmployeeInternalContact = {
  type: ContactType;
  value: string;
};
export type EmployeeParametersInvite = {
  positionId: string;
  timetable?: TimetableParametersCreatePattern;
  contact?: EmployeeInternalContact;
  salonId: string;
  nickname?: string | null;
};
export type CashboxResponsesFull = {
  createDate: string;
  paymentType: string;
  id: string;
};
export type CashboxParametersCreate = {
  salonId: string;
  paymentType: string;
};
export type File = {
  data: string;
  filename: string;
};
export type UploadRouterV1Input = {
  image: File;
};
export type VersionType = 'latest' | 'stable' | 'unsupported';
export type DeviceResponsesFull = {
  id: string;
  version?: VersionType;
};
export type Any = {
  version: string;
};
export type DeviceParametersSystem = {
  manufacturer?: string | null;
  appVersion?: string | null;
  model?: string | null;
  fcmToken?: string | null;
  system?: {
    [key: string]: Any;
  } | null;
  country?: string | null;
};
export type OperationResponsesFull = {
  paymentType: string;
  id: string;
  price: Price;
  createDate: string;
};
export type OperationInfoSalaryOperation = {
  initiatorId: string;
  receiverId: string;
  dateTo: string;
};
export type OperationInfoOtherOperation = {
  realizerId: string;
  description: string;
};
export type OperationInfoAppointmentOperation = {
  appointmentId: string;
  realizerId: string;
};
export type OperationParametersCreate = {
  salary?: OperationInfoSalaryOperation;
  other?: OperationInfoOtherOperation;
  salonId: string;
  appointment?: OperationInfoAppointmentOperation;
  paymentType: string;
  price: Price;
};
export type ContactSharedRecoveryContact = {
  id: string;
  type: ContactType;
  value: string;
};
export type ContactParametersCreateRecovery = {
  type: ContactType;
  value: string;
};
export type TimetableResponsesSchedule = {
  intervals: SafeDateInterval[];
  owner: string;
  timeZoneId: string;
};
export type PositionResponsesPartial = {
  title: string;
  id: string;
};
export type EmployeeResponsesPartial = {
  nickname: string;
  avatar: string;
  id: string;
  position: PositionResponsesPartial;
  contacts: ContactSharedPrimaryContact[];
};
export type AuthParametersAppleToken = {
  emailVerified?: boolean | null;
  lastName?: string | null;
  email?: string | null;
  token: string;
  firstName?: string | null;
};
export type PositionParametersCreate = {
  makeOwner: boolean;
  creds: CredentialsSet;
  salary: SalaryParametersRulesCreate;
  title: string;
};
export type SearchResponsesHelpersSuggest = {
  value: string;
};
export type SearchResponsesHelpersSalon = {
  logo: string;
  point: CoordinatePoint;
  name: string;
  id: string;
  type: SalonType;
  isFavorite: boolean;
  address: Address;
};
export type SearchResponsesFull = {
  suggests: SearchResponsesHelpersSuggest[];
  salons: SearchResponsesHelpersSalon[];
};
export type ProcedureResponsesUpdate = {
  duration: number;
  price: Price;
  parameters: ProcedureHelpersParameterResponse[];
  serviceId: string;
  masterNickname: string;
  masterId: string;
  serviceTags: TranslatedServiceTag[];
  alias?: string | null;
  masterAvatar: string;
  serviceTitle: string;
  description?: string | null;
  id: string;
};
export type UpdateString = {
  value?: string | null;
};
export type ProcedureParametersUpdate = {
  alias?: UpdateString;
  price?: Price;
  description?: UpdateString;
  duration?: number | null;
};
export type ComplexResponsesRetrieve = {
  priceShift: ComplexHelpersPriceShift;
  alias?: string | null;
  chunks: ComplexHelpersChunkResponse[];
  description?: string | null;
  id: string;
};
export type StatisticResponsesAppointments = {
  price: Price;
  count: number;
};
export type HandleInviteResponsesClientMergeSuccess = {
  id: string;
  alias?: string | null;
};
export type HandleInviteParametersClientMerge = {
  contact: string;
};
export type ProcedureResponsesRetrieve = {
  serviceId: string;
  masterNickname: string;
  serviceTitle: string;
  duration: number;
  price: Price;
  description?: string | null;
  serviceTags: TranslatedServiceTag[];
  parameters: ProcedureHelpersParameterResponse[];
  masterId: string;
  masterAvatar: string;
  id: string;
  alias?: string | null;
};
export type EmployeeApiAppointmentResponsesAll = {
  complexes: EmployeeApiAppointmentResponsesComplex[];
  procedures: EmployeeApiAppointmentResponsesProcedure[];
};
export type SalaryResponsesBalanceFull = {
  grid?: Price[] | null;
  procent?: Price[] | null;
  sum: Price[];
  wage?: Price;
};
export type HandleInviteResponsesEmployeeSuccess = {
  logo: string;
  nickname: string;
  id: string;
  position: string;
};
export type CustomerResponsesRegistration = {
  accessToken: Token;
};
export type CustomerInternalContact = {
  type: ContactType;
  value: string;
};
export type CustomerParametersRegistration = {
  contact?: CustomerInternalContact;
};
export type OfftimeResponsesFull = {
  reason?: string | null;
  id: string;
  timeZoneId: string;
  interval: SafeDateInterval;
  coefficient: number;
};
export type OfftimeParametersCreate = {
  coefficient: number;
  reason?: string | null;
  interval: SafeDateInterval;
};
export type HandleInviteResponsesMaskedContacts = {
  contacts: string[];
};
export type EmployeeApiAppointmentParametersCreateProcedure = {
  clientId: string;
  time: SafeDateInterval;
  procedureId: string;
};
export const {
  usePostTimetablesSearchSlotsMutation,
  useGetFavoritesQuery,
  useGetWorkspaceEmployeesCredentialsQuery,
  useGetClientAppointmentNewQuery,
  usePutWorkspaceMutation,
  usePostWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspaceQuery,
  useGetClientAppointmentNewComplexByIdQuery,
  useGetSalonByIdProfileQuery,
  usePostClientAppointmentNewBySalonIdComplexMutation,
  usePutUsersMutation,
  useGetUsersQuery,
  useDeleteUsersMutation,
  usePostClientAppointmentNewBySalonIdProcedureMutation,
  useGetSalonByIdCatalogQuery,
  usePutContactsEmployeeByEmployeeIdByContactIdMutation,
  useDeleteContactsEmployeeByEmployeeIdByContactIdMutation,
  useGetWorkspaceServicesByIdQuery,
  useDeleteWorkspaceServicesByIdMutation,
  usePostWorkspaceAppointmentNewComplexMutation,
  usePutFavoritesByIdRemoveMutation,
  usePostWorkspaceClientsMutation,
  useGetWorkspaceClientsQuery,
  useDeleteContactsUserByContactIdMutation,
  usePostTimetablesByOwnerByForceMutation,
  usePutWorkspacePositionsByIdMutation,
  useDeleteWorkspacePositionsByIdMutation,
  useGetWorkspacePositionsByIdQuery,
  useGetNotificationsQuery,
  usePutNotificationsReadedByIdMutation,
  usePostWorkspaceServicesMutation,
  useGetWorkspaceServicesQuery,
  usePutWorkspaceEmployeesByIdMutation,
  useGetWorkspaceEmployeesByIdQuery,
  useDeleteWorkspaceEmployeesByIdMutation,
  usePostWorkspaceProceduresMutation,
  useGetWorkspaceProceduresQuery,
  usePostContactsClientByClientIdMutation,
  useGetContactsClientByClientIdQuery,
  useDeleteWorkspaceOfftimeByIdMutation,
  useGetWorkspaceClientsByIdQuery,
  useGetWorkspaceAppointmentNewProcedureByIdQuery,
  useDeleteWorkspaceAppointmentNewProcedureByIdMutation,
  usePostAuthRefreshMutation,
  usePostWorkspaceComplexMutation,
  useGetWorkspaceComplexQuery,
  usePostAuthGoogleMutation,
  useGetSalonByIdMastersQuery,
  usePostWorkspaceEmployeesInviteMutation,
  usePostWorkspaceCashboxsMutation,
  useGetWorkspaceCashboxsQuery,
  useGetWorkspaceByIdQuery,
  useGetWorkspaceAppointmentNewComplexByIdQuery,
  useDeleteWorkspaceAppointmentNewComplexByIdMutation,
  usePostUploadThumbMutation,
  usePostDevicesMutation,
  usePutFavoritesByIdAddMutation,
  usePostWorkspaceOperationMutation,
  useGetWorkspaceOperationBySalonIdQuery,
  usePutContactsCustomerByContactIdMutation,
  useDeleteContactsCustomerByContactIdMutation,
  useGetTestLoggerErrorQuery,
  useDeleteWorkspaceOperationByIdMutation,
  usePostContactsSalonBySalonIdMutation,
  useGetContactsSalonBySalonIdQuery,
  usePostContactsUserMutation,
  useGetContactsUserQuery,
  useGetTimetablesSchedulesQuery,
  usePutWorkspaceActivateMutation,
  useGetWorkspaceEmployeesQuery,
  usePostAuthTestMutation,
  useGetTestErrorQuery,
  usePostWorkspacePositionsMutation,
  useGetWorkspacePositionsQuery,
  useGetClientAppointmentNewProcedureByIdQuery,
  useGetSearchQuery,
  usePostContactsCustomerMutation,
  useGetContactsCustomerQuery,
  usePutWorkspaceComplexByIdMutation,
  useDeleteWorkspaceComplexByIdMutation,
  useGetWorkspaceComplexByIdQuery,
  usePostAuthAppleMutation,
  usePostContactsEmployeeByEmployeeIdMutation,
  useGetContactsEmployeeByEmployeeIdQuery,
  useGetWorkspaceAssigmentsStatisticQuery,
  usePostHandleInviteClientByIdMergeMutation,
  usePutWorkspaceProceduresByIdMutation,
  useGetWorkspaceProceduresByIdQuery,
  useDeleteWorkspaceProceduresByIdMutation,
  useGetWorkspaceAppointmentNewAllPaginatedQuery,
  usePutContactsClientByClientIdByContactIdMutation,
  useDeleteContactsClientByClientIdByContactIdMutation,
  useGetWorkspaceAppointmentNewAllByDatesQuery,
  useGetWorkspaceEmployeesByIdSalaryQuery,
  usePutHandleInviteEmployeeByIdMutation,
  usePostUsersCustomerMutation,
  usePostWorkspaceOfftimeByOwnerMutation,
  useGetWorkspaceOfftimeByOwnerQuery,
  usePutWorkspaceDeactivateMutation,
  useGetHandleInviteClientByIdContactsQuery,
  usePutContactsSalonBySalonIdByContactIdMutation,
  useDeleteContactsSalonBySalonIdByContactIdMutation,
  usePostAuthLogoutMutation,
  useDeleteWorkspaceCashboxsByIdMutation,
  usePostWorkspaceAppointmentNewProcedureMutation,
  usePutNotificationsReadedMutation,
} = injectedRtkApi;
