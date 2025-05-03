describe('ChampionshipController', function() {
    beforeEach(module('championshipApp'));
  
    let $controller;
  
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));
  
    it('should initialize with 10 teams', function() {
      const $scope = {};
      $controller('ChampionshipController', { $scope });
      expect(Object.keys($scope.teams).length).toBe(10);
    });
  
    it('should add match result correctly', function() {
      const $scope = {};
      $controller('ChampionshipController', { $scope });
  
      const initialSVS = $scope.teams['svs'];
      $scope.match = { team1: 'svs', score1: 2, team2: 'gioco', score2: 3 };
      $scope.addMatch();
      expect($scope.teams['svs']).toBe(initialSVS + 2);
      expect($scope.teams['gioco']).toBe(3);
    });
  });
  